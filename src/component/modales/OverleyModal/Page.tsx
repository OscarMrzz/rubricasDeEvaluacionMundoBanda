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
      <div className={`w-2xl h-120 bg-[#415a77] ${Animar ? 'scale-100' : 'scale-75'}  transition-all duration-500 ease-in-out`}>
      
      
     

  

     
        {children}
       
        
        
          
      
        
      </div>
    </div>
  ) : null}
</>
  )
}

export default OverleyModal
