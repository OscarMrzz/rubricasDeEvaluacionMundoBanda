/* eslint-disable react-hooks/rules-of-hooks */
import { RegistroEventoInterface } from "@/interfaces/interfaces";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useEffect, useState } from "react";


 export function uselistaEventosFiltro() {
  const { listEventosStore } = useEventosStore();
  const [cargandoEventos, setCargandoEventos] = useState(false);
    const [eventosLista, setEventosLista] = useState<RegistroEventoInterface[]>([]);

      const [eventoSeleccionado, setEventoSeleccionado] = useState<RegistroEventoInterface>();

  useEffect(() => {
    if (listEventosStore.length > 0) {
      setCargandoEventos(true);
    
      setEventosLista(listEventosStore);
      setCargandoEventos(false);
    }
    }, [listEventosStore]);

    
      useEffect(() => {
           const eventoLocalStorage = localStorage.getItem("EventoSelecionado");
        if (eventoLocalStorage && eventoLocalStorage !== "undefined") {
    
       setEventoSeleccionado(JSON.parse(eventoLocalStorage));
     
        }
    
    
      }, []);




    return { eventosLista, cargandoEventos, eventoSeleccionado, setEventoSeleccionado };
}