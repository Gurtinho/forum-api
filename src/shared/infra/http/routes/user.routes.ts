import { Router } from 'express'

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import multer from 'multer'
import { uploadFile } from '@utils/uploadFile'
import { UploadAvatarUserController } from '@modules/accounts/useCases/uploadAvatarUser/UploadAvatarUserController'

export const userRouter = Router()
const uploadAvatar = multer(uploadFile('images/avatar'))

const createUser = new CreateUserController()
const uploadAvatarUser = new UploadAvatarUserController()

userRouter.post('/', createUser.handle)
userRouter.patch('/avatar/:id',  uploadAvatar.single('avatar'), uploadAvatarUser.handle)