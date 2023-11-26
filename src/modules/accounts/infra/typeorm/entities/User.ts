import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('users')
export class User {
	@PrimaryColumn()
	id: string

	@Column()
	name: string

	@Column()
	username: string

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	isAdmin: boolean

	@Column()
	avatar: string

	@CreateDateColumn()
	created_at: Date

	@CreateDateColumn()
	updated_at: Date

	constructor() {
		if (!this.id) {
			this.id = uuid()
			this.isAdmin = false
		}
	}
}