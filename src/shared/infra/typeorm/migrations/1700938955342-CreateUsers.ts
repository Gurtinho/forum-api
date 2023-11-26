import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1700938955342 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'username',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'email',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'isAdmin',
						type: 'boolean',
						default: false
					},
					{
						name: 'avatar',
						type: 'varchar',
						isNullable: true
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}

}
