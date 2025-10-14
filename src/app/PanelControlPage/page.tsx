
import { AdjustmentsHorizontalIcon, CalendarDaysIcon, ChartBarSquareIcon, ClipboardDocumentCheckIcon, DocumentTextIcon, ListBulletIcon, MapPinIcon, MusicalNoteIcon, UserIcon, UsersIcon } from '@heroicons/react/16/solid'
import React from 'react'



const PanelControlPage = () => {
  return (
    <div className='h-screen grid grid-cols-3 grid-rows-5 p-2 gap-2 '>
     
    <div className='bg-gray-700 col-span-3 flex flex-col justify-center items-center text-2xl font-bold'>
      <ClipboardDocumentCheckIcon className='w-12' />
      <h2>Evaluar</h2>

    </div>
    <div className='bg-gray-700 flex flex-col justify-center items-center  font-bold'>
      <MapPinIcon className='w-12' />
      <h2>Region</h2>

    </div>
    <div className='bg-gray-700 col-span-1  flex flex-col justify-center items-center  font-bold'> 
      <ListBulletIcon className='w-12' />
      <h2 >Categorias</h2>

    </div>
    <div className='bg-gray-700 col-span-1 flex flex-col justify-center items-center  font-bold'>
      <CalendarDaysIcon className='w-12' />
      <h2>Eventos</h2>

    </div >
    <div className='bg-gray-700 col-span-2 flex flex-col justify-center items-center  font-bold'>
      <MusicalNoteIcon className='w-12' />
      <h2>Bandas</h2>

    </div>
    <div className='bg-gray-700 col-span-1 row-span-2 flex flex-col justify-center items-center  font-bold'>
      <AdjustmentsHorizontalIcon className='w-12' />
      <h2>Rubricas</h2>

    </div>
    <div className='bg-gray-700 col-span-1 flex flex-col justify-center items-center  font-bold'>
      <ChartBarSquareIcon className='w-12' />
      <h2 className='flex justify-center items-center text-center'>Resultados Evento</h2>

    </div>
    <div className='bg-gray-700 col-span-1 flex flex-col justify-center items-center  font-bold p-4'>
      <DocumentTextIcon className='w-12' />
      <h2 className='flex justify-center  text-center' >Reporte bandas</h2>

    </div>
    <div className='bg-gray-700 col-span-2 flex flex-col justify-center items-center  font-bold'>
      <UsersIcon className='w-12' />
      <h2>usuarios</h2>

    </div>
    <div className='bg-gray-700 col-span-1 flex flex-col justify-center items-center  font-bold'>
      <UserIcon className='w-12' />
      <h2>Mi perfil</h2>

    </div>
      
    </div>
  )
}

export default PanelControlPage
