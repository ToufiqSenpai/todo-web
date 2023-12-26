'use server'
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

async function deleteTask(todoDate: string, taskId: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + cookies().get('token').value
    }
  })

  revalidateTag('todo.' + todoDate)
}

export default deleteTask