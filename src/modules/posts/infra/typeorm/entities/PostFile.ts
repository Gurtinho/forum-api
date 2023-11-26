import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Post } from "./Post";

@Entity('postfiles')
export class PostFile {
	@PrimaryColumn()
	id: string

	@ManyToOne(() => Post)
	@JoinColumn({ name: 'post_id' })
	posts: Post

	@Column()
	post_id: string

	@Column()
	content: string

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