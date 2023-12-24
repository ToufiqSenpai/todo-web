'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import { InputAdornment, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

type SignupData = {
  name: string
  email: string
  password: string
}

function Signup() {
  const [data, setData] = useState<SignupData>({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<SignupData>({
    name: '',
    email: '',
    password: ''
  })

  const { push } = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.id]: e.target.value })
    setErrors({ ...errors, [e.target.id]: '' })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(response => response.json())
      .then(response => {
        if (response.status == 201) {
          push('/login')
        } else setErrors(response.errors)
      })
  }

  return (
    <form className='max-w-md max-mobile:max-w-[95%] m-auto h-max absolute top-0 bottom-0 left-0 right-0 bg-white shadow-form rounded-lg' onSubmit={handleSubmit}>
      <header className='px-3 text-center mt-3'>
        <h1 className='text-2xl font-semibold'>Create an Account</h1>
        <p className='text-sm mt-2'></p>
      </header>
      <section className='mt-4 px-4'>
        <label className='font-medium'>Name</label>
        <TextField
          type='text'
          size='small'
          margin='dense'
          error={errors.name ? true : false}
          helperText={errors.name && errors.name[0]}
          id='name'
          value={data.name}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position='end'><PersonRoundedIcon /></InputAdornment>
          }}
          fullWidth
        />
        <label className='font-medium'>Email</label>
        <TextField
          type='email'
          size='small'
          margin='dense'
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email[0]}
          id='email'
          value={data.email}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position='end'><AlternateEmailRoundedIcon /></InputAdornment>
          }}
          fullWidth
        />
        <label className='font-medium'>Password</label>
        <TextField
          type='password'
          size='small'
          margin='dense'
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password[0]}
          id='password'
          value={data.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position='end'><LockIcon /></InputAdornment>
          }}
          fullWidth
        />
      </section>
      <section className='px-4 mt-2'>
        <button type='submit' className='mt-2 bg-indigo-500 w-full py-[6px] text-lg rounded-md text-white font-medium'>Sign Up</button>
        {/* <div className='border border-solid border-slate-400 mt-2 rounded-md px-3 py-[6px] flex justify-center items-center cursor-pointer hover:border-slate-700'>
          <div className='relative'>
            <Image alt='google-logo' src='/assets/icon/google-logo.png' width={25} height={25} />
          </div>
          <div className='text-black text-base ml-2 font-medium'>Sign Up with Google</div>
        </div> */}
      </section>
      <div className='mt-5 mb-3 text-center text-sm text-gray-400'>Already have an account? <Link href='/login' className='text-blue-400 no-underline hover:underline'>Sign In</Link></div>
    </form>
  )
}

export default Signup