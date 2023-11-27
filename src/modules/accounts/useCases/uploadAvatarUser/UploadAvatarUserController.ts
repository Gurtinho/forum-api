import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadAvatarUserUseCase } from "./UploadAvatarUserUseCase";

export class UploadAvatarUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id: user_id } = req.params
		const avatar = req.file.filename
		const uploadAvatarUserUseCase = container.resolve(UploadAvatarUserUseCase)
		await uploadAvatarUserUseCase.execute(user_id, avatar)
		return res.status(200).send()
	}
}