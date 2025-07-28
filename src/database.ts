import { knex as setupKnex, Knex } from "knex";
import 'dotenv/config'

if(!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables')
}

export const config:Knex.Config = {
  client: "sqlite3",
  connection: {
  filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations:{
    extension: 'ts',
    directory: './db/migrations',
  }
}

export const knex = setupKnex(config);
