import ApprovateMessage from '@/component/Message/ApprovateMessage';
import { dataBaseSupabase } from '@/lib/supabase';


import React, { useState } from 'react'


type Props = {
    onclose: () => void;
    activarMessageApprovate: () => void;
}

export default function FormularioCambiarPassword({onclose, activarMessageApprovate}: Props) {

    const [nuevoPassword, setNuevoPassword] = React.useState('');
    const [confirmacionPassword, setConfirmacionPassword] = React.useState('');
    
 const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if(nuevoPassword === confirmacionPassword){
        dataBaseSupabase.auth.updateUser({
            password: nuevoPassword
        }).then((respuesta) => {
            if(respuesta.error){
                console.error("❌ Error actualizando la contraseña:", respuesta.error.message);
            }
            if(respuesta.data){
              
                activarMessageApprovate();
                if(onclose){
         
                    onclose();
                }
            }
        })
    }

  }
    const onClickCancelar=()=>{
        setNuevoPassword('');
        setConfirmacionPassword('');
        onclose();
      }

  return (
    <> 
    <div className='p-25'>
           
        <h2 className='text-2xl font-bold'>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <label htmlFor="">Contraseña Anterior</label>
            <input 
            className='border-2 border-gray-300 p-2 rounded-md'
            id='passwordAnterior'
            name='passwordAnterior' 
            type="password" />
            <label htmlFor="">Nueva contraseña</label>
            <input 
             className='border-2 border-gray-300 p-2 rounded-md'
             id='nuevoPassword' 
             name='nuevoPassword'  
             type="password"
             value={nuevoPassword} onChange={evento =>{setNuevoPassword(evento.target.value)}} />
            <label  htmlFor="">Confirmar Contraseña</label>
            <input
             className='border-2 border-gray-300 p-2 rounded-md'
                id='confirmacionPassword'
                name='confirmacionPassword'
                type="password"
                value={confirmacionPassword}
                onChange={evento => setConfirmacionPassword(evento.target.value)}
            />
            <button className='bg-primario h-10 rounded-md' type='submit'>Acpetar</button>
            <button onClick={()=>onClickCancelar()} className="w-full bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700">Cancelar</button>
        </form>
      
    </div>
       </>
  )
}
