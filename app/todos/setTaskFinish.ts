'use server'
import { cookies } from "next/headers";

async function setTaskFinish(todoDate: string, taskId: string, isFinished: boolean) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isFinished }),
    headers: {
      'Authorization': 'Bearer ' + cookies().get('token').value,
      'Content-Type': 'application/json'
    }
  })
}

export default setTaskFinish