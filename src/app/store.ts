import { configureStore } from "@reduxjs/toolkit";
// Make sure the path and filename are correct; for example, if the folder is named 'overlays' and the file is 'overlaySlice.ts':
import overleyReducer from "@/feacture/overleys/overleySlice";
import rubricaReducer from "@/feacture/Rubrica/rubricaSlice";
import  refrescadorData  from "@/feacture/RefrescadorData/refrescadorDataSlice";


const store = configureStore({
    reducer: {
        overley: overleyReducer,
        rubrica: rubricaReducer,
         refrescadorData: refrescadorData,
    
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;