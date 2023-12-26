'use server'
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import moment from "moment"

export interface PostTaskState {
  isSucceed: boolean
  message: string
}

async function postTask(state: PostTaskState, form: FormData): Promise<PostTaskState> {
  const headers = {
    'Authorization': 'Bearer ' + cookies().get('token')?.value,
    'Content-Type': 'application/json'
  }
  const todoDate = form.get('todo-date')

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, {
    method: 'POST',
    body: JSON.stringify({ date: todoDate }),
    headers
  })

  const postTaskRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${todoDate}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ name: form.get('task-name') }),
    headers
  })

  if(postTaskRes.status == 201) {
    revalidateTag('todo.' + moment(todoDate.toString()).toDate().toDateString())
    return { isSucceed: true, message: '' }
  } else {
    return { isSucceed: false, message: (await postTaskRes.json()).errors.name[0] }
  }
}

export default postTask