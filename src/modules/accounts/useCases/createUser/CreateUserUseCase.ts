import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

@injectable()
export class CreateUserUseCase {

	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute({ name, username, email, password, avatar }: ICreateUserDTO): Promise<User> {
		const user = await this.usersRepository.findByEmail(email)
		if (user) {
			throw new AppError('User already exists', 400)
		}
		const passwordHashed = await hash(password, 8)
		const userSaved = await this.usersRepository.create({
			name, username, email, password: passwordHashed, avatar
		})
		return userSaved
	}

}