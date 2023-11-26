import { User } from "../../../../accounts/infra/typeorm/entities/User"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Post } from "./Post"
import { v4 as uuid } from "uuid";

@Entity('comments')
export class Comment {
	@PrimaryColumn()
	id: string

	@Column()
	content: string

	@Column()
	likes: number

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	users: User

	user_id: string

	@ManyToOne(() => Post)
	@JoinColumn({ name: 'post_id' })
	posts: Post

	@Column()
	post_id: string

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