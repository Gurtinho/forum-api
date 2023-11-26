import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePostsTags1700945895603 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'posts_tags',
				columns: [
					{
						name: 'post_id',
						type: 'uuid',
						isNullable: false
					},
					{
						name: 'tag_id',
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
			'posts_tags',
			new TableForeignKey({
				name: 'FKPostTag',
				referencedTableName: 'posts',
				referencedColumnNames: ['id'],
				columnNames: ['post_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		)

		await queryRunner.createForeignKey(
			'posts_tags',
			new TableForeignKey({
				name: 'FKTagPost',
				referencedTableName: 'tags',
				referencedColumnNames: ['id'],
				columnNames: ['tag_id'],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('posts_tags', 'FKPostTag')
		await queryRunner.dropForeignKey('posts_tags', 'FKTagPost')
		await queryRunner.dropTable('posts_tags')
	}
}
