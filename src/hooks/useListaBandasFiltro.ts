/* eslint-disable react-hooks/rules-of-hooks */
import { bandaInterface } from "@/interfaces/interfaces";
import RegistroEventossServices from "@/lib/services/registroEventosServices";

import { useEffect, useRef, useState } from "react";



 export function uselistaBandasEventoCategoriaFiltro() {
const eventosServices = useRef(new RegistroEventossServices());
  const [bandasList, setBandasList] = useState<bandaInterface[]>([]);
  const [bandasListSinFiltro, setBandasListSinFiltro] = useState<bandaInterface[]>([]);
  const [idEventoSeleccionadoFiltrarBanda, setIdEventoSeleccionadoFiltrarBanda] = useState<string>("");
  const [idCategoriaSeleccionadaFiltrarBanda, setIdCategoriaSeleccionadaFiltrarBanda] = useState<string>("");
  const [bandaSelecionada, setBandaSeleccionada] = useState<bandaInterface >();
  useEffect(() => {
    const fetchBandas = async () => {
      try {
        // Evitar llamar al servicio si no hay idEvento válido (evita error 22P02 UUID vacío)
        if (!idEventoSeleccionadoFiltrarBanda) {
          setBandasListSinFiltro([]);
          return;
        }

        const bandas = await eventosServices.current.getAsistenciaBandasEvento(idEventoSeleccionadoFiltrarBanda);
        setBandasListSinFiltro(bandas);
      } catch (error) {
        console.error("Error obteniendo bandas de asistencia:", error);
        // Si hay error, limpiar lista para evitar estados inconsistentes
        setBandasListSinFiltro([]);
      }
    }

    fetchBandas();

  }
  , [idEventoSeleccionadoFiltrarBanda]);

  useEffect(() => {
    // Solo ejecutar el filtro si hay datos cargados
    if (bandasListSinFiltro.length === 0) return;
    const idCategoriaFiltro = idCategoriaSeleccionadaFiltrarBanda;
    if (!idCategoriaFiltro) return

    const bandasFiltradas = bandasListSinFiltro.filter((banda) => {
      return banda.idForaneaCategoria === idCategoriaFiltro;
    });

    setBandasList(bandasFiltradas);
  }, [idCategoriaSeleccionadaFiltrarBanda, bandasListSinFiltro]);

  

    return {
        bandasList,
        setIdEventoSeleccionadoFiltrarBanda,
        setIdCategoriaSeleccionadaFiltrarBanda,
        bandaSelecionada,
        setBandaSeleccionada
    };
}