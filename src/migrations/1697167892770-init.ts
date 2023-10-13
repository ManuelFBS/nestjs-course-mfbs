import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697167892770 implements MigrationInterface {
    name = 'Init1697167892770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'CREATOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_projects" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" integer NOT NULL, "user_id" integer, "project_id" integer, CONSTRAINT "PK_f3d2d1a584f1bbc6a91d7ea5773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('CREATED', 'IN_PROGRESS', 'FINISH')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task_name" character varying NOT NULL, "task_description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL, "responsable_name" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_741210c246defe00ed877a98f2a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_741210c246defe00ed877a98f2a"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TABLE "users_projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
