'use client'
import { useState, useRef, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField }  from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormState } from 'react-dom';
import postTask from './postTask';

type Props = {
  date: string
}

function AddTask({ date }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [message, formAction] = useFormState(postTask, null)
  const form = useRef<HTMLFormElement>(null)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    if(!message) handleClose()
  }, [message])

  return (
    <>
      <Button startIcon={<AddCircleIcon />} onClick={() => setOpen(true)}>Add Task</Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <form ref={form} action={formAction}>
            <TextField
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              variant="standard"
              name='task-name'
              error={Boolean(message)}
              helperText={message && message}
            />
            <input type='hidden' name='todo-date' value={date} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => form.current.requestSubmit()}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddTask