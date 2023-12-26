import moment from 'moment';
import TodoHeader from './TodoHeader';
import { cookies } from 'next/headers';
import TaskRow from './TaskRow';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const date = searchParams.date ? moment(searchParams.date, 'DD-MM-YYYY').toDate() : moment().utc().toDate()
  const todoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${date.toISOString()}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + cookies().get('token').value
    },
    next: {
      tags: ['todo.' + date.toDateString()]
    }
  })

  let todo: any = {}

  if(todoRes.status == 200) todo = await todoRes.json()

  return (
    <>
      <TodoHeader date={date} />
      <div className='mt-2'>
        {todo.tasks?.map((task => (
          <TaskRow key={task._id} todoDate={date} task={task} />
        )))}
      </div>
    </>
  )
}
