import React, { useEffect } from "react";

type OverleyModalProps = {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

const OverleyModalFormulario = ({
  open,
  onClose,
  children,
}: OverleyModalProps) => {
  const [Animar, setAnimar] = React.useState(false);
  useEffect(() => {
    if (open) {
      setAnimar(false);
      setTimeout(() => {
        setAnimar(true);
      }, 10);
    } else {
      setAnimar(false); // Reinicia la animación al cerrar
    }
  }, [open]);

  return (
    <div className=" ">
      <style>{`
        .modal-scroll {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.8) rgba(6, 91, 152, 0.5);
        }
    
      `}</style>
      {open ? (
        <div
          onDoubleClick={onClose}
          className=" bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center p-4"
        >
          <div
           onDoubleClick={e => e.stopPropagation()}
            className={`modal-scroll w-2xl  h-[90vh] bg-[#065b98] ${
              Animar ? "scale-100" : "scale-75"
            } transition-all duration-500 ease-in-out rounded-lg`}
          >
            <div className="p-6 pr-4">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OverleyModalFormulario;
