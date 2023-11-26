import fs from 'fs'

export async function removeFile(path: string, filename: string) {
	try {
		await fs.promises.stat(`${path}/${filename}`)
	} catch {
		return
	}
	fs.promises.unlink(`${path}/${filename}`)
}