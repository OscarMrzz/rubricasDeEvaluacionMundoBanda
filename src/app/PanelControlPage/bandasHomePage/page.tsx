"use client";

import { useEffect, useRef, useState } from "react";
import BandasServices from "@/lib/services/bandasServices";
import { bandaDatosAmpleosInterface, categoriaInterface} from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";

import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioAgregarBandaComonent from "@/component/formularios/bandaFormulario/formularioAgregarBandaComponent/Page";
import { PlusIcon } from "@heroicons/react/16/solid";
import CategoriasServices from "@/lib/services/categoriaServices";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionBandaComponent from "@/component/informacion/informacionBandaComponent/Page";
import FormularioEditarBandaComponent from "@/component/formularios/bandaFormulario/formularioEditarBandaComponent/Page";


const BandasHomePage = () => {

  const bandasServices = useRef(new BandasServices())
  const categoriasServices = useRef(new CategoriasServices())

  const [bandasList, setBandasList] = useState<bandaDatosAmpleosInterface[]>([]);

  const [categoriasList, setCategoriasList] = useState<categoriaInterface[]>([]);
    const [selectedBanda, setSelectedBanda] =React.useState<bandaDatosAmpleosInterface | null>(null);
      const [openFormEditar, setOpenFormEditar] = React.useState(false);
 
  const [loading, setLoading] = useState(true);
  const [formularioAgregarHabierto, setFormularioAgregarHabierto] = useState(false);

   const [open, setOpen] = React.useState(false);

  useEffect(() => {
    traerDatosTabla();
  }, []);


  async function traerDatosTabla() {

    try {
      const BandasData: bandaDatosAmpleosInterface[] =await bandasServices.current.getDatosAmpleos();
      const categoriasData: categoriaInterface[] = await categoriasServices.current.get();
      
      setBandasList(BandasData);
      setCategoriasList(categoriasData);
      setLoading(false);
     
    } catch (error) {
      console.error("❌ Error al obtener las Bandas:", error);
      setLoading(false);
    }
  }
  const abrirFormularioAgregar = () => {
    setFormularioAgregarHabierto(true);
  };

    const cerrarModal = () => {
    setOpen(false);
  };

    const cerrarModalEditar = () => {
    setOpenFormEditar(false);
  };

    const abrirModalEditar = () => {
    setOpenFormEditar(true);

  };

  const abrirModalInformacion = (banda: bandaDatosAmpleosInterface) => {
    setSelectedBanda(banda);
    setOpen(true);
  };

  return (
    <>
   
    <div className=" w-full    pb-25"
   >
      <div className="flex justify-between items-center mb-4">

      <h1 className="text-2xl font-bold mb-4">Bandas</h1>
      <button className="cursor-pointer flex justify-center items-center gap-2"  onClick={abrirFormularioAgregar} >
        <PlusIcon className="w-5 h-5   rounded-2xl" />
        Agregar</button>
      </div>
        <div className=" w-full ">

            <OverleyModal open={open} onClose={cerrarModal}>
          {selectedBanda && (
            <InformacionBandaComponent
              Banda={selectedBanda}
              onClose={cerrarModal}
              onRefresh={traerDatosTabla}
              openFormEditar={abrirModalEditar}
            /> 
          )}
        </OverleyModal>

      <OverleyModalFormulario   open={formularioAgregarHabierto} onClose={() => setFormularioAgregarHabierto(false)}>
        <FormularioAgregarBandaComonent refresacar={traerDatosTabla} onClose={() => setFormularioAgregarHabierto(false)} />

      </OverleyModalFormulario>

          <OverleyModalFormulario 
      open={openFormEditar} 
      onClose={cerrarModalEditar} 
    >
      {selectedBanda && (
        <FormularioEditarBandaComponent
          onClose={cerrarModalEditar}
          refresacar={traerDatosTabla}
          bandaAEditar={selectedBanda}
        />
      )}
    </OverleyModalFormulario>

      {loading ? (
        <SkeletonTabla />
      ) : <>
        <div className="flex flex-col gap-4  w-full">
          {
            bandasList.map((banda) => (
              <div 
              key={banda.idBanda}
              className="w-full h-25 bg-gray-700 p-4 cursor-pointer hover:bg-gray-600"
              onDoubleClick={() => abrirModalInformacion(banda)}
              
              >
                <h2 className="text-xl font-bold">{banda.nombreBanda}</h2>
                <p>Alias: {
                 banda.AliasBanda
                }</p>



              </div>
            ))
          }
        </div>
      </>
    }
      
       
    
      </div>
    </div>
    </>
  );
};

export default BandasHomePage;
