"use client";

import React, { useState, useEffect } from "react";


import {   perfilDatosAmpleosInterface, registroEquipoEvaluadorInterface, rubricaDatosAmpleosInterface,} from "@/interfaces/interfaces";
import PerfilesServices from "@/lib/services/perfilesServices";

import { useDispatch } from "react-redux";

import RegistroEquipoEvaluadorServices from "@/lib/services/registroEquipoEvaluadorServices";
import { activarRefrescarDataRegistroEquipoEvaluador } from "@/feacture/EquipoEvaluador/RefrescadorEquipoRegistroEvaluador";



type Props = {

  refresacar?: () => void;
  onClose: () => void;
  idEvento:string;
};



export default  function FormularioEquipoEvaluadorAgregar  ({ refresacar, onClose, idEvento }: Props)  {
  
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
  
  idForaneaPerfil: "",
  rolMiembro: "",
   
  });

 
  const [loading, setLoading] = useState(false);
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [listaPerfiles, setListaPerfiles] = useState<perfilDatosAmpleosInterface[]>([]);
  const [cargadorPerfiles, setCargadorPerfiles] = useState(true);

  useEffect(()=>{
    const perfilesServices = new PerfilesServices()
  perfilesServices.getUsuarioLogiado().then((perfil) => {
    if (perfil) {
      setPerfil(perfil);
    }
  });

    cargarListaPerfiles();
}, []);
  const cargarListaPerfiles = async () => {
  

      try {
         const perfilesServices = new PerfilesServices()
         const registroEquipoEvaluadorServices = new RegistroEquipoEvaluadorServices();
          const registrosEquipoEvaluador = await registroEquipoEvaluadorServices.getDatosAmpleos(idEvento)
          const idsYaRegistrados = new Set(registrosEquipoEvaluador.map(registro => registro.idForaneaPerfil));

        const PerfilLogiado  = await perfilesServices.getUsuarioLogiado()

        const perfiles = await perfilesServices.getDatosAmpleos( PerfilLogiado.idForaneaFederacion, PerfilLogiado.tipoUsuario);
        const perfilesFiltrados = perfiles.filter((perfil) => !idsYaRegistrados.has(perfil.idPerfil));
        setListaPerfiles(perfilesFiltrados);
        setCargadorPerfiles(false);
     
      } catch (error) {
        console.error("❌ Error fetching perfiles by federacion:", error);
      }
    
    };




  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  

    try {
      const registroEquipoEvaluadorServices = new RegistroEquipoEvaluadorServices();
      const nuevaRegsitroEquipoEvaluador: Omit<registroEquipoEvaluadorInterface, "idRegistroEvaluador" | "created_at"> = {
        idForaneaEvento: idEvento,
        idForaneaPerfil: formData.idForaneaPerfil,
        rolMiembro: formData.rolMiembro,
      };

      await registroEquipoEvaluadorServices.create(nuevaRegsitroEquipoEvaluador as registroEquipoEvaluadorInterface);
     


      // Limpiar formulario
      setFormData({
        idForaneaPerfil: "",
        rolMiembro: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Registro Equipo evaluador:", error);
      alert("Error al agregar la miembro del equipo evaluador");
    } finally {
      setLoading(false);
      
      dispatch(activarRefrescarDataRegistroEquipoEvaluador());
    onClose();
    }
  };
  const onClickCancelar=()=>{
      setFormData({
        idForaneaPerfil: "",
        rolMiembro: "",
      });
    onClose();
  }

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Miembro al equipo</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>

       <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaUsuario">
            Usuario
          </label>
          <select
            id="idForaneaPerfil"
            name="idForaneaPerfil"
            value={formData.idForaneaPerfil}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded w-full"
            required
            disabled={cargadorPerfiles}
          >
            {cargadorPerfiles ? (
              <option className="bg-blue-400 text-gray-800" value="">Cargando...</option>
            ) : (
              <>
                <option className=" text-gray-800" value="">Seleccione un perfil</option>
                {listaPerfiles.map((perfil) => (
                  <option className=" text-gray-800"  key={perfil.idPerfil} value={perfil.idPerfil}>
                    {perfil.nombre}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
          <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="rolMiembro">
            Rol Usuario
          </label>
          <select
            id="rolMiembro"
            name="rolMiembro"
            value={formData.rolMiembro}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            required
          >
            <option className="bg-white text-gray-400" value="">
              Seleccione un rol
            </option>
            <option className="bg-white text-gray-800" value="presidenteJurado">
              Presidente jurados
            </option>
            <option className="bg-white text-gray-800" value="jurado">
              Jurado
            </option>
            <option className="bg-white text-gray-800" value="fiscal">
              Fiscal
            </option>
            <option className="bg-white text-gray-800" value="sinPermisos">
              Sin permisos
            </option>
          </select>
        </div>

        

      
        <div className="flex flex-col">
      
   
        </div>
     
    
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "cargado..." : "Agregar"}
        </button>
        <button onClick={()=>onClickCancelar()} className="w-full bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700">Cancelar</button>
      </form>
    </div>
  );
};


