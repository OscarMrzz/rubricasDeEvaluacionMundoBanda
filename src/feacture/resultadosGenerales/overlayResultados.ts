import { createSlice } from "@reduxjs/toolkit";

const overleResultadosSlice = createSlice({
  name: "overleResultados",
  initialState: {

    activadorOverleyInformacionResultados: false,
    activadorOverleyFormularioAgregarResultados: false,
    activadorOverleyFormularioEditarResultados: false,
  },

  reducers: {
    activarOverleyInformacionResultados: (state) => {state.activadorOverleyInformacionResultados = true;},
    desactivarOverleyInformacionResultados: (state) => {state.activadorOverleyInformacionResultados = false;},

    activarOverleyFormularioAgregarResultados: (state) => {state.activadorOverleyFormularioAgregarResultados = true;},
    desactivarOverleyFormularioAgregarResultados: (state) => {state.activadorOverleyFormularioAgregarResultados = false;},

    activarOverleyFormularioEditarResultados: (state) => {state.activadorOverleyFormularioEditarResultados = true;},
    desactivarOverleyFormularioEditarResultados: (state) => {state.activadorOverleyFormularioEditarResultados = false;},

  }

});

export const {
  activarOverleyInformacionResultados, desactivarOverleyInformacionResultados,

  activarOverleyFormularioAgregarResultados, desactivarOverleyFormularioAgregarResultados,

  activarOverleyFormularioEditarResultados, desactivarOverleyFormularioEditarResultados


} = overleResultadosSlice.actions;

export default overleResultadosSlice.reducer;

