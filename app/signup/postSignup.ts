'use server'

import { redirect } from "next/navigation"

export interface PostSignupState {
  name: string
  email: string
  password: string
  isSucceed: boolean
}

async function postSignup(state: PostSignupState, form: FormData): Promise<PostSignupState> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password')}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(res.status == 201) {
    redirect('/login')
  } else {
    const { errors } = await res.json()
    return {
      name: errors.name[0] ?? '',
      email: errors.email[0] ?? '',
      password: errors.password[0] ?? '',
      isSucceed: false
    }
  }
}

export default postSignup