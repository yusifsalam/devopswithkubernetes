import { createConnection } from 'typeorm'
import { typeOrmConfig } from '../config'
import Todo from '../entity/Todo'
;(async () => {
  console.log('Beginning dbseed task.')

  const conn = await createConnection(typeOrmConfig)
  console.log('PG connected.')
  let todo1 = new Todo()
  todo1.text = 'Buy milk'
  const todoRepo = conn.getRepository(Todo)
  todo1 = await todoRepo.save(todo1)
  console.log('todo saved with id ', todo1.id)

  let todo2 = new Todo()
  todo2.text = 'Fix computer'
  let todo3 = new Todo()
  todo3.text = 'Finish fullstack course'

  todo2 = await todoRepo.save(todo2)
  console.log('todo saved with id ', todo2.id)

  todo3 = await todoRepo.save(todo3)
  console.log('todo saved with id ', todo3.id)

  await conn.close()
  console.log('PG connection closed.')

  console.log('Finished dbseed task.')
})()
