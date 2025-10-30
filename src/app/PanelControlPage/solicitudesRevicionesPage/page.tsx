'use client'

import InformacionSolicitudRevicion from '@/component/informacion/informacionReviciones/InformacionSolicitudRevicion'
import { solicitudRevicionDatosAmpleosInterface, vistaSolicitudRevicionInterface } from '@/interfaces/interfaces'
import SolicitudRevicionServices from '@/lib/services/solicitudRevicionServices'
import { useModalInformacionSolicitudRevicionesStore } from '@/Store/revicionesStore/modalInformacionSolicitudRevicionStore'
import { spec } from 'node:test/reporters'
import React, { useEffect, useRef } from 'react'

export default function SolicitudesRevicionesPage() {
   const {activadorModalInformacionSolicitudReviciones,desactivarModalInformacionSolicitudRevisar, activarModalInformacionSolicitudRevisar} =useModalInformacionSolicitudRevicionesStore()
  const solicitudRevicionServices = useRef(new SolicitudRevicionServices())
  const [solicitudesList, setSolicitudesList] = React.useState<vistaSolicitudRevicionInterface[]>([])
  const [solicitudSeleccionada, setSolicitudSelecionada] = React.useState<vistaSolicitudRevicionInterface | null>(null)

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const solicitudes = await solicitudRevicionServices.current.getVista()
      setSolicitudesList(solicitudes)
    }
    fetchSolicitudes()


  }, [])

  const handleDobleClickSolicitud = (solicitud:vistaSolicitudRevicionInterface) => {
    setSolicitudSelecionada(solicitud)
    activarModalInformacionSolicitudRevisar()
  }


  return (
    <>
    {solicitudSeleccionada && (
      <InformacionSolicitudRevicion
      open={activadorModalInformacionSolicitudReviciones}
      onClose={desactivarModalInformacionSolicitudRevisar}
      solicitudRevicion={solicitudSeleccionada}
      />
    )}



   
    <div className='flex flex-col gap-4 '>
      {
        solicitudesList.map((solicitud:vistaSolicitudRevicionInterface,index) => (
          <div
          onDoubleClick={() => handleDobleClickSolicitud(solicitud)}
            key={solicitud.idSolicitud} className=' w-full min-h-35 bg-slate-700 p-4 cursor-pointer hover:bg-slate-600'>
            <div className='flex gap-4'>
                 <span className=' text-2xl font-black'>{index+1}</span>
            <h2 className='text-2xl font-bold '>{solicitud.nombreBanda}</h2>

            </div>
         
            < p className='text-gray-400' >Detalles: {solicitud.detallesSolicitud}</p>
            

            </div>
        ))

      }
      
      
    </div>
     </>
  )
}
