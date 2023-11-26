import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

const node_env = process.env.NODE_ENV === 'test'

export const dataConnection = new DataSource({
	type: 'postgres',
	host: node_env ? 'localhost' : process.env.DB_DOCKER_HOST,
	port: node_env ? Number(process.env.DB_LOCAL_PORT) : Number(process.env.DB_DOCKER_PORT),
	database: node_env ? 'forum_test' : process.env.DB_BASE,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	migrations: [
		'src/shared/infra/typeorm/migrations/**/*.{js,ts}',
	],
	entities: [
		'src/modules/**/infra/typeorm/entities/**/*.{js,ts}',
	],
})