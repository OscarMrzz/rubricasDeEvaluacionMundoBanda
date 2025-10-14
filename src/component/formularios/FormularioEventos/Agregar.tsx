"use client";

import { RootState } from "@/app/store";
import { activarRefrescarDataEventos } from "@/feacture/Eventos/refrescadorDataEventos";
import {
  criterioEvaluacionDatosAmpleosInterface,
  perfilDatosAmpleosInterface,
  regionesDatosAmpleosInterface,
  RegistroEventoInterface,
} from "@/interfaces/interfaces"; // Update the path as needed
import cumplimientossServices from "@/lib/services/cumplimientosServices";
import PerfilesServices from "@/lib/services/perfilesServices";
import RegionService from "@/lib/services/regionesServices";
import RegistroEventossServices from "@/lib/services/registroEventosServices";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  onClose: () => void;
};

export default function FormularioAgregarEventoComponet({ onClose }: Props) {
  const dispatch = useDispatch();
  const [perfilActivo, setPerfilActivo] = useState<perfilDatosAmpleosInterface>()

  useEffect(() => {
    cargarPerfilActivo();
  }, []);


  const cargarPerfilActivo = async () => {
    try{
      const perfilServices = new PerfilesServices();
      const perfil = await perfilServices.getUsuarioLogiado()
      if(perfil){
        setPerfilActivo(perfil)
      }
    
    } catch(error){
      console.error("❌ Error cargando el perfil activo:", error);
    }
  }


  const [listaRegiones, SetlistaRegiones] = useState<
    regionesDatosAmpleosInterface[]
  >([]);
  const [listaRegionesOriginal, setListaRegionesOriginal] = useState<
    regionesDatosAmpleosInterface[]
  >([]);
  const [cargandoRegiones, setCargandoRegiones] = useState(true);

  useEffect(() => {
    cargarListaRegiones();
    console.log("Lista de regiones actual:");
  }, []);

  const [formData, setFormData] = useState({
    lugarEvento: "",
    fechaEvento: "",
    idForaneaFederacion: "",
    idForaneaRegion: "",
  });

  const [loading, setLoading] = useState(false);

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
      const registoEvntoServices = new RegistroEventossServices();

      const nuevoEvento: Omit<
        RegistroEventoInterface,
        "idEvento" | "created_at"
      > = {
        LugarEvento: formData.lugarEvento,
        fechaEvento: formData.fechaEvento,
        idForaneaFederacion: perfilActivo?.idForaneaFederacion ?? "",
        idForaneaRegion: formData.idForaneaRegion,
      };

      await registoEvntoServices.create(nuevoEvento as RegistroEventoInterface);

      // Limpiar formulario
      setFormData({
        lugarEvento: "",
        fechaEvento: "",
        idForaneaFederacion: "",
        idForaneaRegion: "",
      });
    } catch (error) {
      console.error("❌ Error al crear la Evento:", error);
      alert("Error al agregar la Eventos");
    } finally {
      setLoading(false);

      dispatch(activarRefrescarDataEventos());
      onClose();
    }
  };

  const cargarListaRegiones = async () => {
    setCargandoRegiones(true);
    try {
      const regionesServices = new RegionService();
      const regiones = await regionesServices.getDatosAmpleos();
      console.log("Regiones cargadas:", regiones);
      if (regiones) {
        SetlistaRegiones([]);
        setListaRegionesOriginal(regiones);
        SetlistaRegiones(regiones);

        
      

      }

    } catch (error) {
      console.error("❌ Error cargando la lista de regiones:", error);
    } finally {
      setCargandoRegiones(false);
    }
  };



  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Evento</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="lugarEvento">
            Lugar
          </label>
          <input
            type="text"
            id="lugarEvento"
            name="lugarEvento"
            value={formData.lugarEvento}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="lugar del evento..."
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="fechaEvento">
            Fecha
          </label>
          <input
            type="date"
            id="fechaEvento"
            name="fechaEvento"
            value={formData.fechaEvento}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder=""
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="idForaneaRegion">
            Región
          </label>
          <select
            id="idForaneaRegion"
            name="idForaneaRegion"
            value={formData.idForaneaRegion}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded w-full"
            required
            disabled={cargandoRegiones}
          >
            {cargandoRegiones ? (
              <option className="bg-blue-400 text-gray-800" value="">Cargando...</option>
            ) : (
              <>
                <option className=" text-gray-800" value="">Seleccione una región</option>
                {listaRegiones.map((region) => (
                  <option className=" text-gray-800"  key={region.idRegion} value={region.idRegion}>
                    {region.nombreRegion}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="flex flex-col"></div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "cargado..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
}
