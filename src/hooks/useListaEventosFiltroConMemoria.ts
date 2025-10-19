/* eslint-disable react-hooks/rules-of-hooks */
import { RegistroEventoInterface } from "@/interfaces/interfaces";
import { useEventosStore } from "@/Store/EventosStore/listEventosStore";
import { useEffect, useState } from "react";


export function uselistaEventosFiltroConMemoria() {
    const { listEventosStore } = useEventosStore();

    const [cargandoEventosConMemoria, setCargandoEventosConMemoria] = useState(false);
    const [eventosListConMemoria, setEventosListConMemoria] = useState<RegistroEventoInterface[]>([]);
    const [eventoSeleccionadoConMemoria, setEventoSeleccionadoConMemoria] = useState<RegistroEventoInterface>();

    useEffect(() => {
        if (listEventosStore.length > 0) {
            setCargandoEventosConMemoria(true);

            setEventosListConMemoria(listEventosStore);
            setCargandoEventosConMemoria(false);
        }
    }, [listEventosStore]);


    useEffect(() => {
        const eventoLocalStorage = localStorage.getItem("EventoSelecionado");
        if (eventoLocalStorage && eventoLocalStorage !== "undefined") {

            setEventoSeleccionadoConMemoria(JSON.parse(eventoLocalStorage));

        }


    }, []);




    return { eventosListConMemoria, cargandoEventosConMemoria, eventoSeleccionadoConMemoria, setEventoSeleccionadoConMemoria };
}