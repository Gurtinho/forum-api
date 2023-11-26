import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePosts1700945184275 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'posts',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'title',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'likes',
						type: 'int',
						isNullable: true
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: false
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

		await queryRunner.createForeignKey(
			'posts',
			new TableForeignKey({
				name: 'FKUserPost',
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				columnNames: ['user_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('posts', 'FKUserPost')
		await queryRunner.dropTable('posts')
	}

}
