'use client'
import { Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

type Props = {
  name: string
  email: string
}

function Navbar({ name, email }: Props) {
  const [menu, setMenu] = useState<HTMLElement | null>(null)

  return (
    <nav className='h-12 bg-white border-[1px] border-solid border-[#e9ecef]'>
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
        <h2 className='text-xl font-bold'>Flare Todo</h2>
        <Avatar
          onClick={e => setMenu(e.currentTarget)}
          sx={{ cursor: 'pointer' }}
        />
        <Menu
          anchorEl={menu}
          open={Boolean(menu)}
          onClick={() => setMenu(null)}
          onClose={() => setMenu(null)}
          sx={{
            fontSize: '10px'
          }}
        >
          <MenuItem>
            <PersonOutlineOutlinedIcon sx={{ marginRight: '8px' }} /> {name}
          </MenuItem>
          <MenuItem>
            <EmailOutlinedIcon sx={{ marginRight: '8px' }} /> {email}
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: '#D11521' }}>
            <LogoutOutlinedIcon sx={{ marginRight: '8px' }} /> Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  )
}

export default Navbar