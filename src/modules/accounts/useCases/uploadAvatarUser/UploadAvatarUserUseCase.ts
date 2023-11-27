import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { removeFile } from "@utils/removeFile";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadAvatarUserUseCase {

	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(user_id: string, avatar_file: string): Promise<void> {
		const userFounded = await this.usersRepository.findById(user_id)
		if (!userFounded) {
			throw new AppError('User not found')
		}
		if (userFounded.avatar) {
			await removeFile(`./images/avatar`, userFounded.avatar)
		}
		userFounded.avatar = avatar_file
		await this.usersRepository.create(userFounded)
	}
}