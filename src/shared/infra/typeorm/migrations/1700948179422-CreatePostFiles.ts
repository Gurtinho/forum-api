import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePostFiles1700948179422 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'postfiles',
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
						type: 'varchar',
						default: 'now()'
					}
				]
			})
		)

		await queryRunner.createForeignKey(
			'postfiles',
			new TableForeignKey({
				name: 'FKPostPostfile',
				referencedTableName: 'posts',
				referencedColumnNames: ['id'],
				columnNames: ['post_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('postfiles', 'FKPostPostfile')
		await queryRunner.dropTable('postfiles')
	}

}
