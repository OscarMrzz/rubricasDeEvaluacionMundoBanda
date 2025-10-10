
import { create } from 'zustand';

interface storetInterface {
    haySesionStore: boolean;
    iniciarSesionStore: () => void;
    cerrarSesionStore: () => void;
}

export const useInicioSesionStore = create<storetInterface>((set) => ({
    haySesionStore: false,
    iniciarSesionStore: () => set(() => ({ haySesionStore: true })),
    cerrarSesionStore: () => set(() => ({ haySesionStore: false })

    ),
}));
