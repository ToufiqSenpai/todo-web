'use client'
import { useState, Suspense } from 'react'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AddTask from './AddTask';
import moment, { Moment } from 'moment';
import Tasks from './Tasks';

export default function Home() {
  const [date, setDate] = useState<Moment>(moment())

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className='flex justify-between items-center'>
        <DatePicker
          value={date}
          onChange={newDate => setDate(newDate)}
        />
        <AddTask date={date.toISOString()} />
      </div>
      <Suspense>
        <Tasks date={date.toISOString()} />
      </Suspense>
    </LocalizationProvider>
  )
}
