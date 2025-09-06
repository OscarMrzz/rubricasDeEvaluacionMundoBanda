

import React, {  useEffect } from 'react'



type OverleyModalProps = {
  open: boolean;
    onClose: () => void;
titulo?: string;
texto?: string;


}

export default function ErrorMessage ({open, onClose, titulo,texto}:OverleyModalProps)  {
  
  const [Animar, setAnimar] = React.useState(false);

  useEffect(() => {
    if (open) {
      setAnimar(false);
      setTimeout(() => { setAnimar(true); }, 10);
    } else {
      setAnimar(false); // Reinicia la animación al cerrar
    }
  }, [open]);




  return (
<>
  {open ? (
    <div onClick={()=>{onClose()}}  className=" bg-gray-800/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center">
      <div  className={` text-red-500 rounded-2xl flex flex-col justify-center items-center w-120 h-80 bg-[#ffffff] ${Animar ? 'scale-100' : 'scale-75'}  transition-all duration-500 ease-in-out`}>
        <div className='w-60 overflow-hidden flex  justify-center items-center'>
            
         <img src="/imgs/error-icon.png" alt=""  className='w-45 h-45'/>
            </div> 
       <div className='text-center flex flex-col justify-center items-center gap-4'>
       
       
              <h2 className='text-xl font-bold'>{titulo}</h2>
         <p>{texto}</p>

         </div>
          <button onClick={()=>{onClose()}} className='bg-red-700 text-30 text-red-300 p-2.5 rounded-2xl'>Aceptar</button>
       
      </div>
    </div>
  ) : null}
</>
  )
}


