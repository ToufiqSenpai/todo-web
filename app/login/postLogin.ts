'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function postLogin (state: boolean, form: FormData) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
    headers: {
      "Content-Type": 'application/json'
    }
  })

  if(res.status == 200) {
    cookies().set('token', (await res.json()).token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60
    })
    redirect('/')
  } else {
    return true
  }
}

export default postLogin