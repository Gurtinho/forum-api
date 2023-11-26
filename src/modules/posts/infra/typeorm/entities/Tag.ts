import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('tags')
export class Tag {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@CreateDateColumn()
	created_at: Date

	@CreateDateColumn()
	updated_at: Date

	constructor() {
		if (!this.id) {
			this.id = uuid()
		}
	}
}