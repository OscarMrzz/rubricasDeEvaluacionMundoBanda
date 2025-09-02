"use client";

import {  useEffect, useState } from "react";
import SkeletonTabla from "@/component/skeleton/SkeletonTabla/Page";
import React from "react";

import { PlusIcon } from "@heroicons/react/16/solid";
import { cumplimientosDatosAmpleosInterface } from "@/interfaces/interfaces";

import { useDispatch, useSelector } from "react-redux";
import { activarOverleyCumplimientoFormularioAgregar } from "@/feacture/overleys/overleySlice";
import { RootState } from "@/app/store";

import { desactivarRefrescarDataCumplimiento } from "@/feacture/RefrescadorData/refrescadorDataSlice";
import cumplimientossServices from "@/lib/services/cumplimientosServices";

import TablaCumplimientosComponent from "../Tablas/TablaCumplimientosComponent/TablaCumplimientosComponent";

export default function CumplimientosComponent() {
  const refrescadorDataCumplimientos = useSelector(
    (state: RootState) => state.refrescadorData.RefrescadorDataCumplimiento
  );
  const [cumpimientos, setCumplimientos] = useState<
    cumplimientosDatosAmpleosInterface[]
  >([]);
  
  const [CumplimientosOriginales, setCumplimientosOriginales] = useState<
    cumplimientosDatosAmpleosInterface[]
  >([]);
  const [loading, setLoading] = useState(true);

  const [idCriterioSeleccionado, setIdCriterioSeleccionado] =
    useState<string>("");
  const dispatch = useDispatch();
  const criterioSeleccionado = useSelector(
    (state: RootState) => state.criterio.CriterioSeleccionado
  );

  useEffect(() => {
    setIdCriterioSeleccionado(criterioSeleccionado.idCriterio);
    traerDatosTabla();
  }, []);

  useEffect(() => {
    if (refrescadorDataCumplimientos) {
      traerDatosTabla();
    
      dispatch(desactivarRefrescarDataCumplimiento());
    }
  }, [refrescadorDataCumplimientos]);

  const abrirFormularioAgregar = () => {
    dispatch(activarOverleyCumplimientoFormularioAgregar());
  };

  async function traerDatosTabla() {
    const cumplimientosServices = new cumplimientossServices();
    try {
      const CumplimientosData: cumplimientosDatosAmpleosInterface[] =
        await cumplimientosServices.getDatosAmpleos();

      const cumplimientosFiltrados = CumplimientosData.filter(
        (cumplimiento) =>
          cumplimiento.idForaneaCriterio === criterioSeleccionado.idCriterio
      );
      setCumplimientos(cumplimientosFiltrados);

      setCumplimientosOriginales(cumplimientosFiltrados);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error al obtener las cumplimiento:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarTablaFiltrada();
  }, []);

  const cargarTablaFiltrada = () => {
    let datosFiltrados = [...CumplimientosOriginales];

    if (idCriterioSeleccionado) {
      datosFiltrados = datosFiltrados.filter(
        (item) => item.idForaneaCriterio === idCriterioSeleccionado
      );
    }

    setCumplimientos(datosFiltrados);
  };



  return (
    <div className="px-20">
      <div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Cumplimiento</h1>
            <div className="flex gap-4">
              
     
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <button
              className="cursor-pointer flex justify-center items-center gap-2"
              onClick={abrirFormularioAgregar}
            >
              <PlusIcon className="w-5 h-5 bg-blue-600  rounded-2xl" />
              Agregar
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <SkeletonTabla />
      ) : (
        <TablaCumplimientosComponent
          cumpimientos={cumpimientos}
          onRefresh={traerDatosTabla}
        />
      )}
    </div>
  );
}
