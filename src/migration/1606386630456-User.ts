import {MigrationInterface, QueryRunner} from "typeorm";

export class User1606386630456 implements MigrationInterface {
    name = 'User1606386630456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `okozukai`.`tbl_user` (`id` int NOT NULL AUTO_INCREMENT, `slack_id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, UNIQUE INDEX `slack_id` (`slack_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `slack_id` ON `okozukai`.`tbl_user`");
        await queryRunner.query("DROP TABLE `okozukai`.`tbl_user`");
    }

}
