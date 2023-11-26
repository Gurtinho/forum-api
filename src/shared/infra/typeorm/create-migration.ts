#!/usr/bin/env node
import 'colors'
import yargs from 'yargs'
import { execSync } from 'child_process'

interface IMigration {
	_: (string | number)[]
}

const {
	_: [name],
} = yargs.argv as IMigration

const migrationPath = `src/shared/infra/typeorm/migrations/${name}`

try {
	
	execSync(`typeorm-ts-node-commonjs migration:create ${migrationPath}`, { stdio: 'inherit' })

} catch (error) {
	console.error('Error to execute the script:', error.message.red)
  process.exit(1)
}