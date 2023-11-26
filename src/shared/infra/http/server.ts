import { app } from './app'

app.listen(process.env.APP_PORT, () => {
	console.log('Forum is running 🔥'.green)
})

