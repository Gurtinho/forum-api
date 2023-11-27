import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory"
import { UploadAvatarUserUseCase } from "./UploadAvatarUserUseCase"
import { AppError } from "@shared/errors/AppError"

let usersRepositoryInMemory: UsersRepositoryInMemory
let uploadAvatarUserUseCase: UploadAvatarUserUseCase

describe('Upload Avatar User', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory()
		uploadAvatarUserUseCase = new UploadAvatarUserUseCase(usersRepositoryInMemory)
	})

	it('Should be able to upload a new avatar for an user', async () => {
		const user = await usersRepositoryInMemory.create({
			name: 'Martin Barber',
			username: 'Jacob Sullivan',
			email: 'up@mijkijjis.eh',
			password: '123456',
		})
		await uploadAvatarUserUseCase.execute(user.id, 'image_test.jpg')
		const userFounded = await usersRepositoryInMemory.findById(user.id)
		expect(userFounded).toHaveProperty('id')
		expect(userFounded).toHaveProperty('avatar')
		expect(userFounded.avatar).toEqual('image_test.jpg')
	})

	it('Should not be able to update avatar user if user not exists', async () => {
		await expect(
			uploadAvatarUserUseCase.execute('394891564595072419656560', 'image_test.jpg')
		).rejects.toEqual(new AppError('User not found'))
	})
})