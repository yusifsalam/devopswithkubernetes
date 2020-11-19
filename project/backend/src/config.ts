import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { Todo } from './entity/Todo'

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Todo],
}

export { typeOrmConfig }
