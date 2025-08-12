import Link from 'next/link'
import React from 'react'

const NavBard = () => {
  return (
    <div className="bg-grey-500/5 backdrop-blur-md h-full w-full flex text-white items-center justify-between px-15">
      <div className='flex gap-20'>
        <div>LOGO</div>
      <div>Nombre Federacion</div>

      </div>
      <div className='flex  font-bold text-2xl'>
        <Link href=""> Iniciar secion</Link>
        
       
      </div>
      


      
    </div>
  )
}

export default NavBard
