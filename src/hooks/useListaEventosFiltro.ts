/* eslint-disable react-hooks/rules-of-hooks */
import { RegistroEventoInterface } from "@/interfaces/interfaces";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useEffect, useState } from "react";


 export function uselistaEventosFiltro() {
  const { listEventosStore } = useEventosStore();
  const [cargandoEventos, setCargandoEventos] = useState(false);
    const [eventosList, setEventosList] = useState<RegistroEventoInterface[]>([]);

      const [eventoSeleccionado, setEventoSeleccionado] = useState<RegistroEventoInterface>();

  useEffect(() => {
    if (listEventosStore.length > 0) {
      setCargandoEventos(true);
    
      setEventosList(listEventosStore);
      setCargandoEventos(false);
    }
    }, [listEventosStore]);

    
  




    return { eventosList, cargandoEventos, eventoSeleccionado, setEventoSeleccionado };
}