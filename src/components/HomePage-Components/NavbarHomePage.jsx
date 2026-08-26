 import React from 'react'
 import logo from '@/assets/Itinote-logo.svg'
 
 function NavbarHomePage() {
   return (
     <nav className='sticky top-0 z-40 flex justify-between border-b border-b-[rgba(202,204,221,0.2)] bg-[#F9F9FD] px-[5vw] py-5 '>
        <img src={logo} alt="" />
       
    </nav>
   )
 }
 
 export default NavbarHomePage