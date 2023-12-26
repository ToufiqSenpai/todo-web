'use client'
import React from 'react'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from 'moment';
import { useRouter } from 'next/navigation';
import AddTask from './AddTask';

type Props = {
  date: Date
}

function TodoHeader({ date }: Props) {
  const { push } = useRouter()

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className='flex justify-between items-center'>
        <DatePicker
          value={moment(date).local()}
          onChange={value => {
            push(`/?date=${value.date()}-${value.month() + 1}-${value.year()}`)
          }}
          format='DD-MM-YYYY'
          sx={{ width: 200 }}
        />
        <AddTask date={date.toISOString()} />
      </div>
    </LocalizationProvider>
  )
}

export default TodoHeader