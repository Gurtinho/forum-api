import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
	create({ name, username, email, password, avatar }: ICreateUserDTO): Promise<User>
	findByEmail(email: string): Promise<User>
	findById(id: string): Promise<User>
}