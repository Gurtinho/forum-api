import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Tag } from "./Tag";

@Entity('posts')
export class Post {
	@PrimaryColumn()
	id: string

	@Column()
	title: string

	@Column()
	likes: number

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User

	@Column()
	user_id: string

	@ManyToMany(() => Tag)
	@JoinTable({
		name: 'posts_tags',
		joinColumns: [{ name: 'post_id' }],
		inverseJoinColumns: [{ name: 'tag_id' }]
	})
	tags: Tag[]

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