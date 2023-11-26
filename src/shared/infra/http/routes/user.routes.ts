import { Router } from 'express'

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import multer from 'multer'
import { uploadFile } from '@utils/uploadFile'

export const userRouter = Router()

// const uploadAvatar = multer(uploadFile('images/avatar'))

const createUser = new CreateUserController()

userRouter.post('/', createUser.handle)