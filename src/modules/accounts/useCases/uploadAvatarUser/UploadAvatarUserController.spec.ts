import { AppError } from "@shared/errors/AppError";
import { app } from "@shared/infra/http/app";
import { dataConnection } from "@shared/infra/typeorm/data-source"
import { removeFile } from "@utils/removeFile";
import request from 'supertest';

describe('Upload Avatar User Controller', () => {
	beforeAll(async () => {
		await dataConnection.initialize()
		await dataConnection.runMigrations()
	})

	afterAll(async () => {
		await dataConnection.dropDatabase()
		await dataConnection.driver.disconnect()
	})

	it('Should be able to update avatar from user', async () => {
		const responseUser = await request(app).post('/accounts').send({
			name: 'Mable Townsend',
			username: 'Leo Norris',
			email: 'got@vofi.io',
			password: '26240588'
		}).expect(201)
		const responseUpload = await request(app).patch('/accounts/avatar/' + responseUser.body.id)
			.attach('avatar', 'tests/avatar/image_test.jpg')
		expect(responseUpload.status).toBe(200)
		await expect(
			removeFile('./images/avatar', responseUpload.body.avatar)
		).resolves.toBe(undefined)
	})

	it('Should not be able to upload avatar if user is not exists', async () => {
		await request(app).patch('/accounts/avatar/' + '05271b97-ec85-4178-8603-e5dd257edda2')
			.attach('avatar', 'tests/avatar/image_test.jpg').expect(400)
	})
})