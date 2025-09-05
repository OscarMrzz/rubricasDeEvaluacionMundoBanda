import { configureStore } from "@reduxjs/toolkit";
// Make sure the path and filename are correct; for example, if the folder is named 'overlays' and the file is 'overlaySlice.ts':
import overleyReducer from "@/feacture/overleys/overleySlice";
import rubricaReducer from "@/feacture/Rubrica/rubricaSlice";
import refrescadorData from "@/feacture/RefrescadorData/refrescadorDataSlice";
import criteriosReducer from "@/feacture/Criterios/CriteriosSlice";
import cumplimientosReducer from "@/feacture/cumplimientos/cumplimientosSlice";
import perfilActivo from "@/feacture/Perfil/PerfilSlice";
import overleyPerfileSlice from "@/feacture/Perfil/overleyPerfil";
import refrescadorDataPerfiles from "@/feacture/Perfil/refrescadorPerfiles";
import refrescadorDataEventos from "@/feacture/Eventos/refrescadorDataEventos";
import OverleyEventos from "@/feacture/Eventos/overleysEventosSlice"
import EventosReducer from "@/feacture/Eventos/eventosSlice";
import  PerfilSlice from "@/feacture/Perfil/PerfilSlice";





const store = configureStore({
    reducer: {
        overley: overleyReducer,
        rubrica: rubricaReducer,
        refrescadorData: refrescadorData,
        criterio: criteriosReducer,
        cumplimiento: cumplimientosReducer,
        perfilUsuarioActivo: perfilActivo,
        overleyPerfiles: overleyPerfileSlice,
        refrescadorDataPerfiles: refrescadorDataPerfiles,
        refrescadorDataEventos: refrescadorDataEventos,
        overleyEventos: OverleyEventos,
        eventos: EventosReducer,
        perfil: PerfilSlice,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;