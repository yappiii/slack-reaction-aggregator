import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm'

@Entity('tbl_message', {database: "okozukai"})
@Index('user_id', ['user_id'], {unique: false})
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: "varchar"})
  user_id: string;
  
  @Column({nullable: false, type: "longtext"})
  text: string;

  @Column({nullable: false, type: "varchar"})
  url: string;

  @Column({nullable: false, type: "datetime"})
  post_at: Date;

  @Column({nullable: false, type: "varchar"})
  channel_id: string

  static of(
    userId: string,
    text: string,
    url: string,
    postAt: Date,
    channelId: string
  ): Message {
    const message = new Message()
    message.user_id = userId
    message.text = text
    message.url = url
    message.post_at = postAt
    message.channel_id = channelId
    return message
  }
}
