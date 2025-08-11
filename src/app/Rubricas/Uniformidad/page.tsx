import CriterioCompoenet from '@/component/CriterioComponent/Page'
import EncabezadoRubricaComponet from '@/component/EncabezadoRubricaComponent/Page'
import React from 'react'

const uniformidad = () => {
  return (
    <div className=' p-8 shadow-md flex flex-col gap-8'>
        <EncabezadoRubricaComponet/>
        <CriterioCompoenet
          valorCriterio={5.50}
          nombreCriterio="Variedad de figuras"
          descripcionCriterio="Lorem ipsum dolor sit amet consectetur."
        />
        <CriterioCompoenet
          valorCriterio={10.00}
          nombreCriterio="Creatividad"
          descripcionCriterio="Lorem ipsum dolor sit amet consectetur."
        />
        <CriterioCompoenet
          valorCriterio={15.50}
          nombreCriterio="Presentación"
          descripcionCriterio="Lorem ipsum dolor sit amet consectetur."
        />
        <div>
          <h3 className='text-lg font-bold text-gray-800'>Banda Patria de la Lima</h3>
          <h3 className='text-lg font-bold text-gray-800'>Uniformidad</h3>
          <p><span>Total:</span> <span>31.00</span></p>
        </div>
        <div className='flex flex-col gap-4 justify-between items-center mt-4'>
           <button className='w-full bg-blue-500 text-white py-2 px-4 rounded'>Entregar</button>
        <button className='w-full bg-gray-400 text-white py-2 px-4 rounded'>Cancelar</button>
        </div>
       
    </div>

  )
}

export default uniformidad
