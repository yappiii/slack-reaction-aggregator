import {MigrationInterface, QueryRunner} from "typeorm";

export class Reaction1606379192331 implements MigrationInterface {
    name = 'Reaction1606379192331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_reaction` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `reacted_user_id` varchar(255) NOT NULL, `message_id` int NOT NULL, INDEX `user_id_reacted_user_id` (`user_id`, `reacted_user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `user_id_reacted_user_id` ON `okozukai`.`tbl_reaction`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_reaction`");
    }

}
