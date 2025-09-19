import { createSlice } from "@reduxjs/toolkit";
import {  perfilDatosAmpleosInterface} from "../../interfaces/interfaces";

interface PerfilState {
  perfilActivo: perfilDatosAmpleosInterface ;

  perfilSeleccionado: perfilDatosAmpleosInterface ;
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
  },

    perfilSeleccionado: {
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

const PerfilSlice = createSlice({
  name: "PerfilUsuarioActivo",
  initialState,
  reducers: {
    setPerfilActivo(state, action) {
      state.perfilActivo= action.payload;
    },
    recetiarPerfilActivo(state) {
      state.perfilActivo = initialState.perfilActivo;
    },

    setPerfilSeleccionado(state, action) {
      state.perfilSeleccionado= action.payload;
    }
    , recetiarPerfilSeleccionado(state) {
      state.perfilSeleccionado = initialState.perfilSeleccionado;
    }
  }
});

export const { 
    setPerfilActivo, recetiarPerfilActivo
    , setPerfilSeleccionado, recetiarPerfilSeleccionado

 } =  PerfilSlice.actions;
export default  PerfilSlice.reducer;