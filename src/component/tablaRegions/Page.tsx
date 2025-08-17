import { regionesDatosAmpleosInterface } from '@/interfaces/interfaces';
import React from 'react'
import OverleyModal from '../modales/OverleyModal/Page';
import InformacionRegionesComponent from '../informacion/informacionRegionesComponet/Page';

type Props = {
    regiones: regionesDatosAmpleosInterface[];
    onRefresh?: () => void; // Función para refrescar los datos
}


const TablaRegiones = ({regiones, onRefresh }:Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState<regionesDatosAmpleosInterface | null>(null);

  const seleccionarFila = (region: regionesDatosAmpleosInterface) => {
    setSelectedRegion(region);
    setOpen(true);
  }
  const cerrarModal = () => {
    setOpen(false);
  }

  
    return (
      <div>
    <OverleyModal open={open} onClose={cerrarModal}>
      {selectedRegion && (
        <InformacionRegionesComponent 
          region={selectedRegion} 
          onClose={cerrarModal}
          onRefresh={onRefresh}
        />
      )}
    </OverleyModal>

    
    <div className="">

      <table className="min-w-full  border ">
        <thead>
          <tr>
            <th className="px-4 py-2 border w-1">N°</th>
            <th className="px-4 py-2 border flex justify-start items-start">Nombre</th>
           
          </tr>
        </thead>
        <tbody>
          {regiones.map((region, index) => (
            <tr key={region.idRegion} onDoubleClick={() => seleccionarFila(region)} className="hover:bg-[#035a98] cursor-pointer">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{region.nombreRegion}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
      </div>
  )
}

export default TablaRegiones
