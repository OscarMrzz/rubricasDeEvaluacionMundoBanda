
import React from 'react'



const PanelControlPage = () => {
  return (
    <div className=' w-full h-screen   p-10 flex flex-col lg:flex-row  justify-center gap-6'>
      <div className='flex flex-col gap-4 bg-gray-600  p-4 shadow-lg rounded-lg text-white'>


      <h2 className='text-2xl font-black'>Panel de Administracion</h2>
      <p >Desde aqui tine control total de la app</p>
    <div className='flex flex-col gap-2'>

  
      <p className=' font-medium'>Acciones que puederealizar:    </p>
      <ul className='font-light text-gray-100/80'>
        <li className='font-thin'>Crear/Editar/Eliminar usuarios</li>
        <li>Crear/Editar/Eliminar regiones</li>
        <li>Crear/Editar/Eliminar eventos</li>
        <li>Crear/Editar/Eliminar bandas</li>
        <li>Crear/Editar/Eliminar Equipo Evaluador </li>
        <li>Ver resultados de cada evento</li>
        <li>ver los resultados de cada banda</li>
        <li>Evaluar a las bandas</li>
      
      </ul>
        </div>
              </div>
      <div className='flex flex-col gap-4 bg-gray-600  p-4 shadow-lg rounded-lg text-white'>


      <h2 className='text-2xl font-black'>Recomendacion de uso</h2>

    <div className='flex flex-col gap-2'>

  
  
      <ul className='font-light text-gray-100/80'>
     
        <li>Cree una region</li>
        <li>Cree un evento (todo evento necesita una region)</li>
            <li>Agregue un miembro al equipo evaluador del evento que creo (de doble click a la fila del evento) </li>
        <li>Cree una categoria (coloquele el nombre que guste)</li>
        <li>Agregue una banda (toda banda necesita una categoria)</li>
        <li>cree una rubrica (toda rubrica necesita un categoria) </li>
        <li>agregue criterio de evaluacion ( se agrega en la misma rubrica solo de doble click en la fila de la rubria)</li>
        <li>agregue cumplimiento (segagrega dendotro del criterio solo de doble click a la fila del criterio)</li>
    
      
      </ul>
        </div>
              </div>
    
      
    </div>
  )
}

export default PanelControlPage
