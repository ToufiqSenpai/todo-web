'use client'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import deleteTask from "./deleteTask";
import setTaskFinish from "./setTaskFinish";
import { useFormState } from "react-dom";
import setTaskName, { SetTaskNameState } from "./setTaskName";

type Props = {
  task: any
  todoDate: Date
}

function TaskRow({ task, todoDate }: Props) {
  const [isFinished, setIsFinished] = useState<boolean>(task.isFinished)
  const [editDialog, setEditDialog] = useState<boolean>(false)
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)
  
  const [formState, formAction] = useFormState<SetTaskNameState, FormData>(setTaskName, { isSucceed: true, message: '' })

  const form = useRef<HTMLFormElement>(null)

  const closeEditDialog = () => setEditDialog(false)

  const closeDeleteDialog = () => setDeleteDialog(false)

  const submitDelete = async () => {
    closeDeleteDialog()
    await deleteTask(todoDate.toISOString(), task._id)
  }

  const submitTaskFinish = async () => {
    setIsFinished(!isFinished)
    await setTaskFinish(todoDate.toISOString(), task._id, !isFinished)
  }

  useEffect(() => {
    if(formState.isSucceed) closeEditDialog()
  }, [formState])

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <Checkbox 
          checked={isFinished} 
          onChange={submitTaskFinish} 
        />
        <span>{task.name}</span>
      </div>
      <div className='flex items-center'>
        <IconButton onClick={() => setEditDialog(true)}>
          <EditIcon />
        </IconButton>
        <Dialog open={editDialog} onClose={closeEditDialog} maxWidth='xs' fullWidth>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <form action={formAction} ref={form}>
              <TextField 
                margin="dense"
                type="text"
                fullWidth
                variant="standard"
                name="task-name"
                defaultValue={task.name}
                error={!formState.isSucceed}
                helperText={!formState.isSucceed && formState.message}
              />
              <input type="hidden" name="todo-date" value={todoDate.toISOString()} />
              <input type="hidden" name="task-id" value={task._id} />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog}>Cancel</Button>
            <Button onClick={() => form.current.requestSubmit()}>Ok</Button>
          </DialogActions>
        </Dialog>
        <IconButton onClick={() => setDeleteDialog(true)}>
          <DeleteIcon />
        </IconButton>
        <Dialog open={deleteDialog} onClose={closeDeleteDialog} maxWidth='xs' fullWidth>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure want to delete this task?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>Cancel</Button>
            <Button onClick={submitDelete}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default TaskRow