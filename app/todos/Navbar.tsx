'use client'
import {Avatar, Menu, MenuItem, Divider} from "@mui/material";
import { useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Navbar() {
  const [menu, setMenu] = useState<HTMLElement | null>(null)

  return (
    <nav className='h-12 bg-white px-6 flex justify-between items-center border-[1px] border-solid border-[#e9ecef]'>
      <h2 className='text-xl font-bold'>Flare Todo</h2>
      <Avatar
        onClick={e => setMenu(e.currentTarget)}
      />
      <Menu
        anchorEl={menu}
        open={Boolean(menu)}
        onClick={() => setMenu(null)}
        onClose={() => setMenu(null)}
        sx={{
          fontSize: '10px',
          // width: '2.5em'
        }}
      >
        <MenuItem>
          <PersonOutlineOutlinedIcon /> Name
        </MenuItem>
        <MenuItem>
          <EmailOutlinedIcon /> Email
        </MenuItem>
        <Divider />
        <MenuItem>
          <LogoutOutlinedIcon /> Logout
        </MenuItem>
      </Menu>
    </nav>
  )
}

export default Navbar