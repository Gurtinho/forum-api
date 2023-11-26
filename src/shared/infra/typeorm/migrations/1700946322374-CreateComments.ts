import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateComments1700946322374 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'comments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'content',
						type: 'varchar',
						isNullable: false
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: false
					},
					{
						name: 'post_id',
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
			'comments',
			new TableForeignKey({
				name: 'FK',
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				columnNames: ['user_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
