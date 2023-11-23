'use client'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div>
        <DatePicker

        />
        {/*<FormControl sx={{ width: '120px' }}>*/}
        {/*  <InputLabel id='select-get-by'>Get By</InputLabel>*/}
        {/*  <Select labelId='select-get-by' label='Get By'>*/}
        {/*    <MenuItem>Day</MenuItem>*/}
        {/*    <MenuItem>Week</MenuItem>*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
      </div>
    </LocalizationProvider>
  )
}
