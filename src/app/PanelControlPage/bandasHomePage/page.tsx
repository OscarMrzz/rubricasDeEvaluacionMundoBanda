"use client";

import { useEffect, useState } from "react";
import BandasServices from "@/lib/services/bandasServices";
import { bandaDatosAmpleosInterface} from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";

import TablaBandasComponent from "@/component/Tablas/tablaBandasComponet/Page";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioAgregarBandaComonent from "@/component/formularios/formularioAgregarBandaComponent/Page";
import { PlusIcon } from "@heroicons/react/16/solid";

const BandasHomePage = () => {
  const [bandas, setBandas] = useState<bandaDatosAmpleosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [formularioAgregarHabierto, setFormularioAgregarHabierto] = useState(false);

  useEffect(() => {
    traerDatosTabla();
  }, []);


  async function traerDatosTabla() {
    const bandasServices = new BandasServices();
    try {
      const BandasData: bandaDatosAmpleosInterface[] =
        await bandasServices.getDatosAmpleos();
      setBandas(BandasData);
      setLoading(false);
      console.log("✅ Bandas obtenidas:");
      console.log(BandasData);
    } catch (error) {
      console.error("❌ Error al obtener las Bandas:", error);
      setLoading(false);
    }
  }
  const abrirFormularioAgregar = () => {
    setFormularioAgregarHabierto(true);
  };


  

  return (
    <>
   
    <div className=" px-25 mx-20  pb-25"
   >
      <div className="flex justify-between items-center mb-4">

      <h1 className="text-2xl font-bold mb-4">Bandas</h1>
      <button className="cursor-pointer flex justify-center items-center gap-2"  onClick={abrirFormularioAgregar} >
        <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
        Agregar</button>
      </div>
        <div className="">

      <OverleyModalFormulario   open={formularioAgregarHabierto} onClose={() => setFormularioAgregarHabierto(false)}>
        <FormularioAgregarBandaComonent refresacar={traerDatosTabla} onClose={() => setFormularioAgregarHabierto(false)} />

      </OverleyModalFormulario>

      {loading ? (
        <SkeletonTabla />
      ) : (
      

       
        <TablaBandasComponent
          bandas={bandas}
          onRefresh={traerDatosTabla}
        />
      )}
      </div>
    </div>
    </>
  );
};

export default BandasHomePage;
