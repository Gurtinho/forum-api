import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {

	private users: User[] = []

	async create({ name, username, email, password, avatar }: ICreateUserDTO): Promise<User> {
		const user = new User()
		Object.assign(user, {
			name, username, email, password, avatar
		})
		this.users.push(user)
		return user
	}

	async findByEmail(email: string): Promise<User> {
		return this.users.find(user => user.email === email)
	}

	async findById(id: string): Promise<User> {
		return this.users.find(user => user.id === id)
	}

}