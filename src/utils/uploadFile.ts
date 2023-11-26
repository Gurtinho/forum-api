import multer from "multer";
import { resolve } from "path";
import crypto from 'node:crypto'

export function uploadFile(path: string) {
	return {
		storage: multer.diskStorage({
			destination: resolve(__dirname, '..', '..', path),
			filename(req, file, callback) {
				const fileHash = crypto.randomBytes(32).toString('hex')
				const fileName = `${fileHash}-${file.originalname}`
				return callback(null, fileName)
			},
		})
	}
}