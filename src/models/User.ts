import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity('tbl_user', {database: "okozukai"})
@Index('slack_id', ['slack_id'], {unique: true})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slack_id: string;

    @Column()
    name: string;

    static of(slackId: string, name: string): User {
      const user = new User()
      user.slack_id = slackId
      user.name = name
      return user
    }
}
