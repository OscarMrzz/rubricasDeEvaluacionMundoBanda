import React, {  useEffect } from 'react'

type OverleyModalProps = {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const OverleyModal = ({open, onClose, children}:OverleyModalProps) => {
  
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
    <div onDoubleClick={onClose}  className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center">
      <div className={`flex flex-col  w-2xl h-120 bg-[#415a77] ${Animar ? 'scale-100' : 'scale-75'}  transition-all duration-500 ease-in-out `}>
      <div className='h-full'>

        {children}
      </div>
    <div className=' flex justify-end p-4'>

      <button onClick={onClose}  className='border-2 px-4 py-2 cursor-pointer hover:bg-gray-200/20'>Cerrar</button>
    </div>
      </div>
    
    </div>
  ) : null}
</>
  )
}

export default OverleyModal
