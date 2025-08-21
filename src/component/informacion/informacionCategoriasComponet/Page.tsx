import { categoriaInterface } from '@/interfaces/interfaces'
import CategoriasServices from '@/lib/services/categoriaServices';
import React from 'react'

type Props = {
    categoria: categoriaInterface;
    onClose?: () => void; // Función para cerrar el modal
    onRefresh?: () => void; // Función para refrescar los datos
}

const InformacionCategoriasComponet = ({ categoria, onClose, onRefresh }: Props) => {
    const eliminarFederacion = () => {
        const categiriasServices = new CategoriasServices();
        categiriasServices.delete(categoria.idCategoria)
            .then(() => {
                console.log("✅ Federación eliminada correctamente");
                onRefresh?.(); // Refrescar los datos
                onClose?.(); // Cerrar el modal después de eliminar
            })
            .catch((error: unknown) => {
                console.error("❌ Error al eliminar la federación:", error);
            });
    }

    return (
        <div>
            <div className='flex p-8 justify-between'>
                <div>
                    <h2>{categoria.nombreCategoria}</h2>
                    <p>ID: {categoria.idCategoria}</p>
                    <p>Creado: {new Date(categoria.created_at).toLocaleDateString()}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer' onClick={eliminarFederacion}>Eliminar</button>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer'>Editar</button>
                </div>
            </div>
        </div>
    )
}

export default InformacionCategoriasComponet
