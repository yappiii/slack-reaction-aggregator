import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm'

@Entity('tbl_reaction', {database: "okozukai"})
@Index('user_id_reacted_user_id', ['user_id', 'reacted_user_id'], {unique: false})
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, type: "varchar"})
  user_id: string
  
  @Column({nullable: false, type: "varchar"})
  reacted_user_id: string

  @Column({nullable: false, type: "int"})
  message_id: number

  @Column({nullable: false, type: "varchar"})
  name: string

  static of(userId: string, reactedUserId: string, messageId: number, name: string): Reaction {
    const reaction = new Reaction()
    reaction.user_id = userId
    reaction.reacted_user_id = reactedUserId
    reaction.message_id = messageId
    reaction.name = name
    return reaction
  }
}
