import {Avatar} from "@mui/material";

function Navbar() {
  return (
    <nav className='h-12 bg-white px-6 flex justify-between items-center border-[1px] border-solid border-[#e9ecef]'>
      <h2 className='text-xl font-bold'>Flare Todo</h2>
      <Avatar />
    </nav>
  )
}

export default Navbar