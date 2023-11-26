import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import 'dotenv/config'
import 'colors'
import '@shared/container'
import { router } from './routes/router'
import { dataConnection } from '../typeorm/data-source'
import { AppError } from '@shared/errors/AppError'

export const app = express()

app.use(express.json());
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message
		})
	}
	return response.status(500).json({
		status: 'Error',
		message: `Internal Server Error: ${err.message}`
	})
})

const database = async () => {
	if (process.env.NODE_ENV != 'test') {
		await dataConnection.initialize().catch((err) => {
			throw new Error(`database connection error: ${err}`.red);
		}).then(() => {
			console.log('Database connected ⚡'.yellow);
		})
	}
}
database()