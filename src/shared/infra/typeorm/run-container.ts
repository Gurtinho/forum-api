import 'colors'
import { execSync } from 'child_process'

// Script pra entrar no container do docker e rodar as migrations
const dockerCommand = `docker exec -it forum-app sh`

try {
	(function() {
		execSync(dockerCommand, { stdio: 'inherit' })
	}())
} catch (error) {
  console.error('Error to execute the script:', error.message.red)
  process.exit(1)
}