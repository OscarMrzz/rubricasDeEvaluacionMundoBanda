import { createSlice } from "@reduxjs/toolkit";
import {  registroCumplimientoEvaluacionDatosAmpleosInterface} from "../../interfaces/interfaces";



const initialState:  registroCumplimientoEvaluacionDatosAmpleosInterface[] = [];

const resultadosGeneralesSlice = createSlice({
  name: "filaResultado",
  initialState,
  reducers: {
    setfilaResultadoItemSeleccionado(state, action: { payload: { idBanda: string; idEvento: string } }) {
      return action.payload;
    },
    recetiarfilaResultadoItemSeleccionado() {
      return initialState;
    }
  }
});

export const { 
    setfilaResultadoItemSeleccionado,
    recetiarfilaResultadoItemSeleccionado
 } = resultadosGeneralesSlice.actions;
export default resultadosGeneralesSlice.reducer;