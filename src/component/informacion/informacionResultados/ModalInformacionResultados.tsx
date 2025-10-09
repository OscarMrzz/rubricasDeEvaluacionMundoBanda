import { RootState } from '@/app/store';
import { setfilaResultadoItemSeleccionado } from '@/feacture/resultadosGenerales/ResultadosGeneralesSlice';
import { registroCumplimientoEvaluacionDatosAmpleosInterface } from '@/interfaces/interfaces';
import RegistroCumplimintoServices from '@/lib/services/RegistroCumplimientoServices';
import loading2 from "@/animacionesJson/Loading2.json";
import { div } from 'framer-motion/client';
import Lottie from 'lottie-react';
import React, {  use, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type OverleyModalProps = {
  open: boolean;
  onClose: () => void;

  
  
}

export default function ModalInformacionResultados({open, onClose}:OverleyModalProps)  {


const registroCumplimientoServices =useRef(new RegistroCumplimintoServices());
const [datosCumplimientosbandaSelecionada, setDatosCumplimientosbandaSelecionada] = React.useState<registroCumplimientoEvaluacionDatosAmpleosInterface[] >([]);
 const filaResultadosSelecionada = useSelector((state: RootState) => state.resultadosGeneralesReducer);
 const [cargadoDatos, setCargadoDatos] = React.useState(true);

 const dispatch = useDispatch();
useEffect(() => {
  const fetchData = async () => {
    setCargadoDatos(true);

    if (!filaResultadosSelecionada || !filaResultadosSelecionada.idEvento) return;
    const {idEvento,idBanda} = filaResultadosSelecionada;
    const data = await registroCumplimientoServices.current.getPorBandaYEvento(idBanda, idEvento);
    console.log("Datos de cumplimiento obtenidos:", data);
    setDatosCumplimientosbandaSelecionada(data);
    setCargadoDatos(false);
  };
  fetchData();
}, [filaResultadosSelecionada]);
  
  const [Animar, setAnimar] = React.useState(false);
  useEffect(() => {
    if (open) {
      setAnimar(false);
      setTimeout(() => { setAnimar(true); }, 10);
    } else {
      setAnimar(false); // Reinicia la animación al cerrar
    }
  }, [open]);

  const cerrarModal = () => {
    setDatosCumplimientosbandaSelecionada([]);
    dispatch(setfilaResultadoItemSeleccionado({idBanda:"", idEvento:""}));
    setCargadoDatos(true);

    setAnimar(false);
    onClose()
  }




  return (
<>
  {open ? (
    <div onDoubleClick={()=>cerrarModal()}  className="bg-gray-950/50 inset-0 z-100 fixed w-screen h-screen flex justify-center items-center">
      <div className={`w-4xl h-140 bg-[#065b98] ${Animar ? 'scale-100' : 'scale-75'}  transition-all duration-500 ease-in-out`}>

        {
!cargadoDatos  ? (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Información de Resultados</h2>

      
       
      


         <ul>
      {datosCumplimientosbandaSelecionada.map((dato) => (
        <li key={dato.idRegistroCumplimientoEvaluacion} className="mb-2 border-b border-gray-300 pb-2">
          {
            dato.rubricas.nombreRubrica
          }
          
          
        </li>
      ))}
          
    </ul>


        
    
 
  </div>
) : (
  <div className="p-4 flex justify-center items-start">
    <div className='w-xl '>
         
          <Lottie animationData={loading2} loop={true} className=" " />
        </div>
       
  </div>
)
        }

     

      </div>
    </div>
  ) : null}
</>
  )
}

