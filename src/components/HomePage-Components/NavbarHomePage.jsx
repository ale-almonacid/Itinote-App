 import React from 'react'
 import logo from '@/assets/Itinote-logo.svg'
 
 function NavbarHomePage() {
   return (
     <nav className='sticky top-0 z-40 border-b border-b-[rgba(202,204,221,0.2)] bg-[#F9F9FD]'>
        <div className='mx-auto flex w-full max-w-360 justify-between px-[5vw] py-5'>
          <img src={logo} alt="" />
        </div>
    </nav>
   )
 }
 
 export default NavbarHomePage