'use client'
import Link from 'next/link'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import { InputAdornment, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useFormState } from 'react-dom'
import postSignup, { PostSignupState } from './postSignup'

function Signup() {
  const [errors, formAction] = useFormState<PostSignupState, FormData>(postSignup, { 
    name: '', 
    email: '', 
    password: '', 
    isSucceed: true 
  })

  return (
    <form className='max-w-md max-mobile:max-w-[95%] m-auto h-max absolute top-0 bottom-0 left-0 right-0 bg-white shadow-form rounded-lg' action={formAction}>
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
          name='name'
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name}
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
          name='email'
          error={Boolean(errors.email)}
          helperText={errors.email && errors.email}
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
          name='password'
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password}
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