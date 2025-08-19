import { bandaDatosAmpleosInterface } from '@/interfaces/interfaces'
import BandasServices from '@/lib/services/bandasServices';
import React from 'react'

type Props = {
    Banda: bandaDatosAmpleosInterface;
    onClose?: () => void; // Función para cerrar el modal
    onRefresh?: () => void; // Función para refrescar los datos
}

const InformacionBandaComponent = ({ Banda, onClose, onRefresh }: Props) => {
    const eliminarBanda = () => {
        const bandasServices = new BandasServices();
        bandasServices.delete(Banda.idBanda)
            .then(() => {
                console.log("✅ Banda eliminada correctamente");
                onRefresh?.(); // Refrescar los datos
                onClose?.(); // Cerrar el modal después de eliminar
            })
            .catch((error: unknown) => {
                console.error("❌ Error al eliminar la banda:", error);
            });
    }

    return (
        <div>
            <div className='flex p-10 justify-between'>
                <div>
                    <h2 className='text-2xl font-bold pb-4'>{Banda.nombreBanda}</h2>
                    <p>Federacion: <span>{Banda.federaciones.nombreFederacion}</span></p>
                    <p>Categoria: {Banda.categorias.nombreCategoria}</p>
                    <p>Región: {Banda.regiones.nombreRegion}</p>
         
         
                </div>
                <div className='flex flex-col gap-2'>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer' onClick={eliminarBanda}>Eliminar</button>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer'>Editar</button>
                </div>
            </div>
        </div>
    )
}

export default InformacionBandaComponent
