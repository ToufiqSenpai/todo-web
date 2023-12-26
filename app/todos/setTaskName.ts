'use server'
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export interface SetTaskNameState {
  isSucceed: boolean
  message: string
}

async function setTaskName(state: SetTaskNameState, form: FormData): Promise<SetTaskNameState> {
  const todoDate = form.get('todo-date')
  const taskId = form.get('task-id')
  const taskName = form.get('task-name')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: taskName }),
    headers: {
      'Authorization': 'Bearer ' + cookies().get('token').value,
      'Content-Type': 'application/json'
    }
  })

  if(res.status == 200) {
    revalidateTag('todo.' + todoDate)
    return { isSucceed: true, message: '' }
  } else {
    return { isSucceed: false, message: (await res.json()).errors.name[0] }
  }
}

export default setTaskName