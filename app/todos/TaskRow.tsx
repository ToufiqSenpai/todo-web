import { Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskRow() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <Checkbox />
        <span>Task Name</span>
      </div>
      <div className='flex items-center'>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default TaskRow