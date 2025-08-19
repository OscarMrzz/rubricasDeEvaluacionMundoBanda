"use client";

import { useEffect, useState } from "react";
import CategoriasServices from "@/lib/services/categoriaServices";
import { categoriaInterface } from "@/interfaces/interfaces";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";
import TablaCategoriasComponent from "@/component/tablaCategoriasComponent/Page";

const CategoriasHomePage = () => {
  const [categorias, setCategorias] = useState<categoriaInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    traerDatosTabla();
  }, []);

  async function traerDatosTabla() {
    const categoriasServices = new CategoriasServices();
    try {
      const categoriasData: categoriaInterface[] =
        await categoriasServices.get();
      setCategorias(categoriasData);
      setLoading(false);
      console.log("✅ Categorías obtenidas:");
      console.log(categoriasData);
    } catch (error) {
      console.error("❌ Error al obtener las categorías:", error);
      setLoading(false);
    }
  }

  return (
    <div className="px-20">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <TablaCategoriasComponent
          categorias={categorias}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
};

export default CategoriasHomePage;
