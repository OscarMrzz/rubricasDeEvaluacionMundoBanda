 
 import { rubricaDatosAmpleosInterface,  } from '@/interfaces/interfaces';
import RubricasServices from '@/lib/services/rubricasServices';

 import React from 'react'
 type Props = {
     rubrica: rubricaDatosAmpleosInterface;
     onClose: () => void; // Función para cerrar el modal
     onRefresh?: () => void; // Función para refrescar los datos
     openFormEditar: () => void; // Función para abrir el formulario de edición
 }
 
 export default function InformacionRubricaComponent ({ rubrica, onClose, onRefresh ,openFormEditar}: Props)  {
     const eliminar = () => {
         const rubricaServices = new RubricasServices()
         rubricaServices.delete(rubrica.idRubrica)
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
                     <h2>{rubrica.nombreRubrica}</h2>
                     <p>Categoría: {rubrica.categorias?.nombreCategoria}</p>
                     <p>Puntos: {rubrica.puntosRubrica}</p>
                     <p>Detalles: {rubrica.datalleRubrica}</p>
                    
           
 
                 </div> 
                 <div className='flex flex-col gap-2'>
                     <button className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer  '  onClick={eliminar} >Eliminar</button>
                     <button onClick={onclickEditar}  className='border-2 border-white w-20 p-1 hover:bg-blue-400 cursor-pointer'>Editar</button>
                 </div>
             </div>
 
 
 
         </div>
     )
 }
 

 