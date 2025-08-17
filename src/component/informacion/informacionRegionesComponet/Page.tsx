import { regionesDatosAmpleosInterface } from '@/interfaces/interfaces'
import RegionService from '@/lib/services/regionesServices';
import React from 'react'
type Props = {
    region: regionesDatosAmpleosInterface;
    onClose?: () => void; // Función para cerrar el modal
    onRefresh?: () => void; // Función para refrescar los datos
}

const InformacionRegionesComponent = ({ region, onClose, onRefresh }: Props) => {
    const eliminarRegion = () => {
        const regionesServices = new RegionService();
        regionesServices.delete(region.idRegion)
            .then(() => {
                console.log("✅ Región eliminada correctamente");
                onRefresh?.(); // Refrescar los datos
                onClose?.(); // Cerrar el modal después de eliminar
            })
            .catch((error) => {
                console.error("❌ Error al eliminar la región:", error);
            });
    }

    return (
        <div>
            <div className='flex p-8 justify-between'>
                <div>
                    <h2>{region.nombreRegion}</h2>
                    <p>Federacion: {region.federaciones?.nombreFederacion || 'federacion no encontrada'}</p>

                </div>
                <div className='flex flex-col gap-2'>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer  '  onClick={eliminarRegion} >Eliminar</button>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer'>Editar</button>
                </div>
            </div>



        </div>
    )
}

export default InformacionRegionesComponent
