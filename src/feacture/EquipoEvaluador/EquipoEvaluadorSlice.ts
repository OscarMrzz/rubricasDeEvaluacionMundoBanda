import { createSlice } from "@reduxjs/toolkit";
import {   registroEquipoEvaluadorDatosAmpleosInterface } from "../../interfaces/interfaces";

interface equipoEvaluadorsState {
  registrosEquipoEvaliadorSeleccionado : registroEquipoEvaluadorDatosAmpleosInterface;
}

const initialState: equipoEvaluadorsState= {
 registrosEquipoEvaliadorSeleccionado : {
    idRegistroEvaluador: "",
    created_at: "",
    idForaneaEvento: "",
    idForaneaUser: "",
    rolMiembro: "",
    registroEventos: {
        idEvento: "",
        created_at: "",
        LugarEvento: "",
        fechaEvento: "",
        idForaneaRegion: "",
        idForaneaFederacion: ""

  },
    perfiles: {
        idPerfil: "",
        created_at: "",
        nombre: "",
        alias: "",
        fechaNacimiento: "",
        genero: "",
        tipoUsuario: "",
        sexo: "",
        idForaneaFederacion: "",
        identidad: "",
        numeroTelefono: "",
        direccion: "",
        idForaneaUser: ""
    }
    } as registroEquipoEvaluadorDatosAmpleosInterface
};

const registrosEquipoEvaliadorSlice= createSlice({
  name: "RegistrosEquipoEvaliadorSlice",
  initialState,
  reducers: {
    setregistrosEquipoEvaliadorSeleccionado(state, action) {
      state.registrosEquipoEvaliadorSeleccionado = action.payload;
    },
    recetiarregistrosEquipoEvaliadorSeleccionado(state) {
      state.registrosEquipoEvaliadorSeleccionado = initialState.registrosEquipoEvaliadorSeleccionado;
    }
  }
});

export const { 
    setregistrosEquipoEvaliadorSeleccionado,
    recetiarregistrosEquipoEvaliadorSeleccionado
 } = registrosEquipoEvaliadorSlice.actions;
export default registrosEquipoEvaliadorSlice.reducer;