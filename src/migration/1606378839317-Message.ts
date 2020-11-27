import {MigrationInterface, QueryRunner} from "typeorm";

export class Message1606378839317 implements MigrationInterface {
    name = 'Message1606378839317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_message` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `text` longtext NOT NULL, `url` varchar(255) NOT NULL, `post_at` datetime NOT NULL, INDEX `user_id` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `user_id` ON `okozukai`.`tbl_message`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_message`");
    }

}
