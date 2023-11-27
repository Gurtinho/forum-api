import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../entities/User";
import { Repository } from "typeorm";
import { dataConnection } from "@shared/infra/typeorm/data-source";

export class UsersRepository implements IUsersRepository {

	private repository: Repository<User>

	constructor() {
		this.repository = dataConnection.getRepository(User)
	}

	async create({ id, name, username, email, password, avatar }: ICreateUserDTO): Promise<User> {
		const user = this.repository.create({
			id, name, username, email, password, avatar
		})
		const userSaved = await this.repository.save(user)
		return userSaved
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOneBy({ email })
		return user
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOneBy({ id })
		return user
	}

}