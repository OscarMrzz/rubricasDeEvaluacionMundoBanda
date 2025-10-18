

import { categoriaInterface } from '@/interfaces/interfaces';
import { useCategoriasStore } from '@/Store/CategoriasStore/listCategoriaStore';
import React, { useEffect, useState } from 'react'


export  function useListaCategoriaFiltro() {
      const { listCategoriasStore } = useCategoriasStore();

        const [cargandoCategorias, setCargandoCategorias] = useState(false);
          const [categoriasLista, setCategoriasLista] = useState<categoriaInterface[]>();

            const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<categoriaInterface>();

      useEffect(() => {
        if (listCategoriasStore.length > 0) {
          setCargandoCategorias(true);
          setCategoriasLista(listCategoriasStore);
          setCargandoCategorias(false);
        }
      }, [listCategoriasStore]);


        useEffect(() => {
          const categoriaLocalStorage = localStorage.getItem("CategoriaSelecionada");
          if (categoriaLocalStorage && categoriaLocalStorage !== "undefined") {
            setCategoriasSeleccionadas(JSON.parse(categoriaLocalStorage));
          }
        }, []);


  return {categoriasLista, cargandoCategorias, categoriasSeleccionadas, setCategoriasSeleccionadas};
   
}
