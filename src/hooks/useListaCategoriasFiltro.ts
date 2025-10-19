

import { categoriaInterface } from '@/interfaces/interfaces';
import { useCategoriasStore } from '@/Store/CategoriasStore/listCategoriaStore';
import React, { useEffect, useState } from 'react'


export function useListaCategoriaFiltro() {
  const { listCategoriasStore } = useCategoriasStore();

  const [cargandoCategorias, setCargandoCategorias] = useState(false);
  const [categoriasList, setCategoriasList] = useState<categoriaInterface[]>();
  const [categoriaSelecionada, setcategoriaSelecionada] = useState<categoriaInterface>();

  useEffect(() => {
    if (listCategoriasStore.length > 0) {
      setCargandoCategorias(true);
      setCategoriasList(listCategoriasStore);
      setCargandoCategorias(false);
    }
  }, [listCategoriasStore]);


 



  return { categoriasList, cargandoCategorias, categoriaSelecionada, setcategoriaSelecionada };

}
