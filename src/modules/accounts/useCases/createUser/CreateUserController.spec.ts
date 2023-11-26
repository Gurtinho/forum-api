import { dataConnection } from "@shared/infra/typeorm/data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import { app } from "@shared/infra/http/app"

let testConnection: DataSource

describe('Create User Controller', () => {
	beforeAll( async () => {
		testConnection = await dataConnection.initialize()
    await testConnection.driver.connect()
    await testConnection.runMigrations()
	})

	afterAll(async () => {
		await testConnection.query('DROP SCHEMA public CASCADE;').catch(async () => {
    	await testConnection.dropDatabase()
		})
	})
	
	it('Should be able to create a new user', async () => {
		const response = await request(app).post('/accounts').send({
			name: 'Mable Townsend',
			username: 'Leo Norris',
			email: 'got@vofi.io',
			password: '26240588'
		})
		expect(response.status).toBe(201)
	})

	it('Should not be able to create a new user if user already created with same email', async () => {
		await request(app).post('/accounts').send({
			name: 'Augusta Rose',
			username: 'Bradley Boone',
			email: 'got@vofi.io',
			password: '52291947'
		})
		const response = await request(app).post('/accounts').send({
			name: 'Augusta Rose',
			username: 'Bradley Boone',
			email: 'got@vofi.io',
			password: '52291947'
		})
		expect(response.status).toBe(400)
	})
})