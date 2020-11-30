import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from 'dotenv'
import { WebClient, WebAPICallResult } from '@slack/web-api'
import moment from 'moment'
import { Message as MessageModel } from './models/Message'
import { Reaction as ReactionModel } from './models/Reaction'
import { User as UserModel } from './models/User'

interface Channel {
  id: string
}

interface User {
  id: string,
  name: string
}

interface UserList extends WebAPICallResult {
  members: User[]
}

interface Reaction {
  name: string,
  users: string[]
}

interface Message {
  reactions: Reaction[]|undefined,
  user: string,
  client_msg_id: string,
  text: string,
  ts: string
}

interface Conversations extends WebAPICallResult {
  channels: Channel[]
}

interface History extends WebAPICallResult {
  oldest: string,
  messages: Message[]
}

const sleep = async (t: number) => {
  return await new Promise(r => {
    setTimeout(() => {
      r()
    }, t)
  });
}

(async () => {
  dotenv.config()
  const api = new WebClient(process.env.SLACK_BOT_TOKEN)

  const users = await api.users.list() as UserList
  const userModels = users.members.map(
    user => UserModel.of(user.id, user.name)
  )

  const connection = await createConnection()
  await connection.manager.save(UserModel, userModels)
  await connection.close()

  for (let i = 0; i < 24; i++) {
    const conversations = await api.conversations.list() as Conversations

    const historiesByChannel: {channel_id: string, history: History}[] = []
    for (const channel of conversations.channels) {
      const history = await api.conversations.history(
        {
          channel: channel.id,
          latest: moment().endOf('month').subtract(i, 'month').unix().toString(),
          oldest: moment().startOf('month').subtract(i, 'month').unix().toString(),
          limit: 1000
        }
      ) as History
      await sleep(1000)
      historiesByChannel.push({channel_id: channel.id, history: history})
    }

    const messagesByChannelId = historiesByChannel.map((histories) => {
      return {
        channel_id: histories.channel_id,
        messages: histories.history.messages
      }
    })

    const filteredMessages = messagesByChannelId.map(
      messagesByChannelId => messagesByChannelId.messages.filter(message => message.reactions !== undefined)
        .filter(message => message.user !== undefined)
        .map((message): {channel_id: string, message: Message} => {
          return {
            channel_id: messagesByChannelId.channel_id,
            message: message
          }
        })
    ).flat()

    const messageModels = filteredMessages.map(
      filteredMessage => MessageModel.of(
        filteredMessage.message.user,
        filteredMessage.message.text,
        filteredMessage.channel_id + "/p" + filteredMessage.message.ts,
        new Date(moment.unix(parseInt(filteredMessage.message.ts)).toString()),
        filteredMessage.channel_id
      )
    )

    const connection = await createConnection()
    const savedMessageModels: MessageModel[] = await connection.manager.save(MessageModel, messageModels)

    // tbl_reactionに永続化するためのORM list
    const reactionModels = filteredMessages.map(
      (filteredMessage, index) => filteredMessage.message.reactions.map(
        reaction => reaction.users.map(
          user => ReactionModel.of(
            user,
            filteredMessage.message.user,
            savedMessageModels[index].id,
            reaction.name
          )
        )
      ).flat()
    ).flat()

    await connection.manager.save(ReactionModel, reactionModels)
    await connection.close()
  }
})()
