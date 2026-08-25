 import React from 'react'
 import logo from '@/assets/Itinote-logo.svg'
 
 function NavbarHomePage() {
   return (
     <nav className='flex justify-between border-b border-b-[rgba(202,204,221,0.2)] bg-[rgba(202,204,221,0.09)] px-[5vw] py-5 '>
        <img src={logo} alt="" />
       
    </nav>
   )
 }
 
 export default NavbarHomePage