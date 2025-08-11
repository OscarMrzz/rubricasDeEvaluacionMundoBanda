"use client"
import React, { useState } from 'react'
import IndicadorComponet from '../IndicadorComponent/Page'

type Props = {
  valorCriterio: number
  nombreCriterio: string
  descripcionCriterio: string
}
const CriterioCompoenet = ({ valorCriterio, nombreCriterio, descripcionCriterio }: Props) => {
  const [indicadorSeleccionado, setIndicadorSeleccionado] = useState<number>(0)
  
  return (
    <div className=' bg-white p-3.5'>
      <h3 className=' text-lg font-bold text-gray-600'>{nombreCriterio}</h3>
      <p className='text-gray-500'>{descripcionCriterio}</p>
      <div className='flex flex-col gap-3'>
        <IndicadorComponet
          idIndicador={1}
          descripcionIndicador="Lorem ipsum dolor sit amet consectetur."
          valorIndicador={5.50} 
          name="criterio-variedad-figuras"
          EstaSeleccionado={indicadorSeleccionado === 1}
          onChange={(id: number) => setIndicadorSeleccionado(id)}
        />
        <IndicadorComponet 
          idIndicador={2} 
          descripcionIndicador="Lorem ipsum dolor sit amet consectetur." 
          valorIndicador={10.00} 
          name="criterio-variedad-figuras"
          EstaSeleccionado={indicadorSeleccionado === 2}
          onChange={(id: number) => setIndicadorSeleccionado(id)}
        />
        <IndicadorComponet 
          idIndicador={3} 
          descripcionIndicador="Lorem ipsum dolor sit amet consectetur." 
          valorIndicador={15.50}
          name="criterio-variedad-figuras"
          EstaSeleccionado={indicadorSeleccionado === 3}
          onChange={(id: number) => setIndicadorSeleccionado(id)}
        />
        <div>
          {/* Aqui ira un espacio para comentarios */}
          <textarea className='w-full border border-gray-300 p-2 rounded' rows={3} placeholder='Escribe tus comentarios aquí...'></textarea>
          <button className='mt-2 bg-blue-500 text-white py-1 px-2 rounded'>Comentario rapido</button>
        </div>
   

        </div>
       
      
    </div>
  )
}

export default CriterioCompoenet
