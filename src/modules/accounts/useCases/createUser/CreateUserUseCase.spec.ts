import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { AppError } from "@shared/errors/AppError"
import { compare } from "bcryptjs"

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UsersRepositoryInMemory

describe('Create Users', () => {
	beforeEach(() => {
		userRepositoryInMemory = new UsersRepositoryInMemory()
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
	})

	it('Should be able to create a new user', async () => {
		const user = await createUserUseCase.execute({
			name: 'Martin Barber',
			username: 'Jacob Sullivan',
			email: 'up@mijkijjis.eh',
			password: '123456',
		})
		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('password')
	})

	it('Should not be able to create a new user if email already created', async () => {
		await createUserUseCase.execute({
			name: 'Martin Barber',
			username: 'Jacob Sullivan',
			email: 'up@mijkijjis.eh',
			password: '123456',
		})
		await expect(
			createUserUseCase.execute({
				name: 'Martin Barber',
				username: 'Jacob Sullivan',
				email: 'up@mijkijjis.eh',
				password: '123456',
			})
		).rejects.toEqual(new AppError('User already exists'))
	})

	it('Should be able to verify if password has created using hash', async () => {
		const password = '123456'
		const user = await createUserUseCase.execute({
			name: 'Martin Barber',
			username: 'Jacob Sullivan',
			email: 'up@mijkijjis.eh',
			password,
		})
		const passwordMath = await compare(password, user.password)
		expect(user).toHaveProperty('id')
		expect(passwordMath).toBeTruthy()
		expect(password != user.password).toBeTruthy()
	})
})