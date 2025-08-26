
import { categoriaDatosAmpleosInterface, categoriaInterface } from '@/interfaces/interfaces';
import CategoriasServices from '@/lib/services/categoriaServices';
import React from 'react'
type Props = {
    categoria: categoriaInterface;
    onClose: () => void; // Función para cerrar el modal
    onRefresh?: () => void; // Función para refrescar los datos
    openFormEditar: () => void; // Función para abrir el formulario de edición
}

const InformacionCategoriaComponent = ({ categoria, onClose, onRefresh ,openFormEditar}: Props) => {
    const eliminar = () => {
        const categoriaServices = new CategoriasServices()
        categoriaServices.delete(categoria.idCategoria)
            .then(() => {
                console.log("✅ Región eliminada correctamente");
                onRefresh?.(); // Refrescar los datos
                onClose?.(); // Cerrar el modal después de eliminar
            })
            .catch((error) => {
                console.error("❌ Error al eliminar la región:", error);
            });
    }
       const onclickEditar = () => {

        openFormEditar?.();
         onClose?.();
    }

    return (
        <div>
            <div className='flex p-8 justify-between'>
                <div>
                    <h2>{categoria.nombreCategoria}</h2>
                    <p>Detalles: {categoria.detallesCategoria}</p>

                </div> 
                <div className='flex flex-col gap-2'>
                    <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer  '  onClick={eliminar} >Eliminar</button>
                    <button onClick={onclickEditar}  className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer'>Editar</button>
                </div>
            </div>



        </div>
    )
}

export default InformacionCategoriaComponent
