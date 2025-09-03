import { createSlice } from "@reduxjs/toolkit";
import {  perfilDatosAmpleosInterface, registroEventoDatosAmpleosInterface} from "../../interfaces/interfaces";

interface PerfilState {
  perfilActivo: perfilDatosAmpleosInterface ;
}

const initialState: PerfilState = {
    perfilActivo: {
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
    idForaneaUser: "",
    federaciones: {
        idFederacion: "",
        created_at: "",
        nombreFederacion: ""
    }
  }
};

const EventoSlice = createSlice({
  name: "PerfilUsuarioActivo",
  initialState,
  reducers: {
    setPerfilActivo(state, action) {
      state.perfilActivo= action.payload;
    },
    recetiarPerfilActivo(state) {
      state.perfilActivo = initialState.perfilActivo;
    }
  }
});

export const { 
    setPerfilActivo, recetiarPerfilActivo

 } = EventoSlice.actions;
export default EventoSlice.reducer;