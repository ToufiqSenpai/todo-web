'use server'
import { cookies } from "next/headers"

async function postTask(message: string, form: FormData) {
  const headers = {
    'Authorization': 'Bearer ' + cookies().get('token')?.value,
    'Content-Type': 'application/json'
  }
  const todoDate = form.get('todo-date')

  const isTodoExist = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}`, {
    method: 'GET',
    headers
  }).then(res => res.status != 404)

  createTodo: {
    if(isTodoExist) break createTodo

    const createTodoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, {
      method: 'POST',
      body: JSON.stringify({ date: todoDate }),
      headers
    })

    if(createTodoRes.status != 201) {
      return (await createTodoRes.json()).errors.date[0]
    }
  }

  const postTaskRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ name: form.get('task-name') }),
    headers
  })

  if(postTaskRes.status == 201) {
    return null
  } else {
    return (await postTaskRes.json()).errors.name[0]
  }
}

export default postTask