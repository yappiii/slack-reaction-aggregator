import {MigrationInterface, QueryRunner} from "typeorm";

export class Message1606487107499 implements MigrationInterface {
    name = 'Message1606487107499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_message` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `text` longtext NOT NULL, `url` varchar(255) NOT NULL, `post_at` datetime NOT NULL, `channel_id` varchar(255) NOT NULL, INDEX `user_id` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_reaction` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `reacted_user_id` varchar(255) NOT NULL, `message_id` int NOT NULL, `name` varchar(255) NOT NULL, INDEX `user_id_reacted_user_id` (`user_id`, `reacted_user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_user` (`id` int NOT NULL AUTO_INCREMENT, `slack_id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, UNIQUE INDEX `slack_id` (`slack_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `slack_id` ON `okozukai`.`tbl_user`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_user`");
        await queryRunner.query("DROP INDEX `user_id_reacted_user_id` ON `okozukai`.`tbl_reaction`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_reaction`");
        await queryRunner.query("DROP INDEX `user_id` ON `okozukai`.`tbl_message`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_message`");
    }

}
