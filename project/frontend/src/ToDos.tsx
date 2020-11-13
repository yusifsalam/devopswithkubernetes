import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface ToDo {
  id: number
  text: string
}

const ToDoList: React.FC = () => {
  const [toDos, setToDos] = useState<ToDo[]>([])
  const [newTodo, setNewTodo] = useState<null | string>(null)

  useEffect(() => {
    const getToDos = async () => {
      const data = await axios.get(`http://localhost:8081/api/todos`)
      setToDos(data.data)
    }
    getToDos()
  }, [setToDos])

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const todo = await axios.post(`http://localhost:8081/api/todos`, {
      text: newTodo,
    })
    setToDos([...toDos, todo.data])
    setNewTodo(null)
  }

  const handleChange = (e: any) => {
    setNewTodo(e.target.value)
  }

  if (!toDos.length) return <div>No todos</div>
  return (
    <div>
      <h1>TO DOs</h1>
      <form onSubmit={handleAdd}>
        <input
          placeholder='Todo text'
          onChange={handleChange}
          value={newTodo ? newTodo : ''}
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {toDos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
