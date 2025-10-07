import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface para el estado
interface EvaluarState {
    // Objeto dinámico para pares clave (string) - valor (number)
    evaluaciones: Record<string, number>;
}

// Estado inicial
const initialState: EvaluarState = {
    evaluaciones: {},
};

const evaluarSlice = createSlice({
    name: "criterioEvaluar",
    initialState,
    reducers: {
        // Agregar o actualizar un par clave-valor
        agregarCriterioEvaluar: (state, action: PayloadAction<{ idCriterio: string; valor: number }>) => {
            const { idCriterio, valor } = action.payload;
            state.evaluaciones[idCriterio] = valor;
        },



        // Eliminar una evaluación por clave
        eliminarCriterioEvaluado: (state, action: PayloadAction<string>) => {
            delete state.evaluaciones[action.payload];
        },

        // Limpiar todas las evaluaciones
        recetiarCriteriosEvaluados: (state) => {
            state.evaluaciones = {};
        },

        // Incrementar el valor de una clave específica
        updateCriterioEvaluado: (state, action: PayloadAction<{ idCriterio: string; valor: number }>) => {

            const { idCriterio, valor } = action.payload;

            state.evaluaciones[idCriterio] = valor;
        },

    },
});

// Exportar las acciones
export const {
    agregarCriterioEvaluar,
    eliminarCriterioEvaluado,
    recetiarCriteriosEvaluados,
    updateCriterioEvaluado,
} = evaluarSlice.actions;


export default evaluarSlice.reducer;



