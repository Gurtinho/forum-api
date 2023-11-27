import { dataConnection } from "@shared/infra/typeorm/data-source"
import request from "supertest"
import { app } from "@shared/infra/http/app"

describe('Create User Controller', () => {
	beforeAll(async () => {
		await dataConnection.initialize()
		await dataConnection.runMigrations()
	})

	afterAll(async () => {
		await dataConnection.dropDatabase()
		await dataConnection.driver.disconnect()
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