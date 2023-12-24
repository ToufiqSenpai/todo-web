import { cookies } from "next/headers"
import TaskRow from "./TaskRow"

type Props = {
  date: string
}

async function Tasks({ date }: Props) {
  const token = cookies().get('token')?.value
  const todo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${date}`, {
    method: 'GET',
    headers: {  
      'Authorization': 'Bearer ' + token
    }
  }).then(res => res.json())

  // return (todo.tasks as any[]).map(task => (
  //   <TaskRow key={task._id} />
  // ))
  return <div></div>
}

export default Tasks