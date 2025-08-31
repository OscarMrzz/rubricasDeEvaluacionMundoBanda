import { createSlice } from "@reduxjs/toolkit";




const overleySlice = createSlice({
  name: "overley",
  initialState: {
     activadorOverleyInformacionRubrica: false,
    activarOverleyFormularioAgregarRubrica: false,
    activadorOverleyFormularioEditarRubrica: false,
 
    activadorOverleyFormularioAgregarCriterios: false,
    
   
    
  },
  
    reducers: {
      /* --------------------01 rubrica----------------------------- */
  

    activarOverleyInformacionRubrica: (state) => {
      state.activadorOverleyInformacionRubrica = true;
    },
    desactivarOverleyInformacionRubrica: (state) => {
      state.activadorOverleyInformacionRubrica = false;
    },
    activarOverleyFormularioAgregarRubrica: (state) => {
      state.activarOverleyFormularioAgregarRubrica = true;
    },
    desactivarOverleyFormularioAgregarRubrica: (state) => {
      state.activarOverleyFormularioAgregarRubrica = false;
    },
    activarOverleyFormularioEditarRubrica: (state) => {
      state.activadorOverleyFormularioEditarRubrica = true;
    },
    desactivarOverleyFormularioEditarRubrica: (state) => {
      state.activadorOverleyFormularioEditarRubrica = false;
    },
      /* --------------------02 criterios----------------------------- */

      toggleOverleyCriteriosFormularioAgregar: (state) => {
      state.activadorOverleyFormularioAgregarCriterios = !state.activadorOverleyFormularioAgregarCriterios;
    },
    activarOverleyCriteriosFormularioAgregar: (state) => {
      state.activadorOverleyFormularioAgregarCriterios = true;
    },
    desactivarOverleyCriteriosFormularioAgregar: (state) => {
      state.activadorOverleyFormularioAgregarCriterios = false;
    },
  }

});


export const { toggleOverleyCriteriosFormularioAgregar,
   activarOverleyCriteriosFormularioAgregar,
    desactivarOverleyCriteriosFormularioAgregar,
    activarOverleyInformacionRubrica,
    desactivarOverleyInformacionRubrica,
    activarOverleyFormularioEditarRubrica,
    desactivarOverleyFormularioEditarRubrica,
    activarOverleyFormularioAgregarRubrica,
    desactivarOverleyFormularioAgregarRubrica

   } = overleySlice.actions;

export default overleySlice.reducer;

