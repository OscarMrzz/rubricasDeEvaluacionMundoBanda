import { dataBaseSupabase } from "../supabase";
import {  perfilDatosAmpleosInterface, registroCumplimientoEvaluacionDatosAmpleosInterface, registroCumplimientoEvaluacionInterface, resultadosEventoDatosAmpleosInterface, resultadosEventoInterface, resultadosGeneralesInterface, resultadosTemporadaInterface, vistaResultadosModel } from "@/interfaces/interfaces";




type Interface = registroCumplimientoEvaluacionInterface;

const tabla = "registroCumplimientoEvaluaciones";
const elId = "idRegistroCumplimientoEvaluacion";




export default class  RegistroCumplimientoServices   {
  perfil: perfilDatosAmpleosInterface | null = null;
  private perfilInitialized = false;
 
constructor() {
    this.initPerfil()
}

async initPerfil() {
   const perfilCookie = document.cookie.split(';').find(c => c.trim().startsWith('perfilActivo='));
        const perfilBruto = perfilCookie ? decodeURIComponent(perfilCookie.split('=')[1]) : null;
    if (perfilBruto) {
        this.perfil = JSON.parse(perfilBruto) as perfilDatosAmpleosInterface;
    }
    this.perfilInitialized = true;
}

    
       

 
async getDatosAmpleos(): Promise<registroCumplimientoEvaluacionDatosAmpleosInterface[]> {
     
    try {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
     
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) {
            console.error("❌ Error obteniendo regiones con federaciones:", error);
            throw error;
        }

      
        return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    } catch (error) {
        console.error("❌ Error general en getDatosAmpleos:", error);
        throw error;
    }
}

    async get() {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
        .from(tabla).select("*")
        .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);
        if (error) throw error;
        return data;
    }

    async getOne(id: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
              .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq(elId, id)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .single();

        if (error) throw error;
        return data;
    }

    async getPorEvento(idEvento: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
              .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
       return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }
    async getPorBanda(idBanda: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaBanda", idBanda)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }
    async getPorBandaYEvento(idBanda: string, idEvento: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
              .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaBanda", idBanda)
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }
    async getPorEventoCategoria( idEvento: string, idCategoria: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
              .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaCategoria", idCategoria)
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }
    async getPorRubrica(idRubrica: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
                .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaRubrica", idRubrica)
          
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }
    async getPorRubricaYEvento(idRubrica: string, idEvento: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
                .select(`
                *
             ,registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaRubrica", idRubrica)
            .eq("idForaneaEvento", idEvento)
          
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
       return data as registroCumplimientoEvaluacionDatosAmpleosInterface[];
    }


   
    async getResultadosEvento(idEvento: string): Promise<resultadosGeneralesInterface[]> {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        
        // Obtener todas las evaluaciones del evento
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *,
                registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;

        if (!data || data.length === 0) {
            return [];
        }

        // Agrupar por banda y sumar los puntos
        const resultadosPorBanda = new Map<string, resultadosGeneralesInterface>();
        
        data.forEach((evaluacion: registroCumplimientoEvaluacionDatosAmpleosInterface) => {
            const idBanda = evaluacion.idForaneaBanda;
            
            if (!resultadosPorBanda.has(idBanda)) {
                resultadosPorBanda.set(idBanda, {
                    banda: evaluacion.bandas,
                    evento: evaluacion.registroEventos,
                    categoria: evaluacion.categorias,
                    region: evaluacion.regiones,
                    totalPuntos: 0
                });
            }
            
            // Sumar los puntos de esta evaluación
            const puntos = evaluacion.puntosObtenidos || 0;
            const resultado = resultadosPorBanda.get(idBanda);
            if (resultado) {
                resultado.totalPuntos += puntos;
            }
        });

        // Convertir el Map a array y ordenar por puntos descendente
        return Array.from(resultadosPorBanda.values())
            .sort((a, b) => b.totalPuntos - a.totalPuntos);
    }
    async getResultadosEventoYCategoria(idEvento: string, idCategoria: string): Promise<resultadosGeneralesInterface[]> {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        
        // Obtener todas las evaluaciones del evento
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *,
                registroEventos(*),
                bandas(*),
                criteriosEvalucion(*),
                cumplimientos(*),
                categorias(*),
                regiones(*),
                perfiles(*),
                federaciones(*),
                rubricas(*)
            `)
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaCategoria", idCategoria)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;

        if (!data || data.length === 0) {
            return [];
        }

        // Agrupar por banda y sumar los puntos
        const resultadosPorBanda = new Map<string, resultadosGeneralesInterface>();
        
        data.forEach((evaluacion: registroCumplimientoEvaluacionDatosAmpleosInterface) => {
            const idBanda = evaluacion.idForaneaBanda;
            
            if (!resultadosPorBanda.has(idBanda)) {
                resultadosPorBanda.set(idBanda, {
                    banda: evaluacion.bandas,
                    evento: evaluacion.registroEventos,
                    categoria: evaluacion.categorias,
                    region: evaluacion.regiones,
                    totalPuntos: 0
                });
            }
            
            // Sumar los puntos de esta evaluación
            const puntos = evaluacion.puntosObtenidos || 0;
            const resultado = resultadosPorBanda.get(idBanda);
            if (resultado) {
                resultado.totalPuntos += puntos;
            }
        });

        // Convertir el Map a array y ordenar por puntos descendente
        return Array.from(resultadosPorBanda.values())
            .sort((a, b) => b.totalPuntos - a.totalPuntos);
    }
 


    async create(dataCreate: Interface) {
         
        if (!this.perfil || !this.perfil.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .insert(dataCreate)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .select("*")
            .single()

        if (error) throw error;
        return data;
    }

    async update(id: string, dataUpdate: Interface) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .update(dataUpdate)
            .eq(elId, id)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .select("*")
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string) {
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { error } = await dataBaseSupabase
            .from(tabla)
            .delete()
            .eq(elId, id)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        return true;
    }

   async puntosTemporadabanda(idBanda: string, anio: number): Promise<number> {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        if (!anio || typeof anio !== 'number' || anio < 1900) {
            throw new Error("Año inválido proporcionado para el cálculo de puntos.");
        }

        // Construir rango para created_at: desde el inicio del año hasta el inicio del siguiente año (exclusive)
        const fechaInicio = new Date(Date.UTC(anio, 0, 1)).toISOString(); // 00:00:00 UTC del 1 de enero
        const fechaFin = new Date(Date.UTC(anio+1 , 0, 1)).toISOString(); // 00:00:00 UTC del 1 de enero del siguiente año

        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("puntosObtenidos")
            .eq("idForaneaBanda", idBanda)
            .gte("created_at", fechaInicio)
            .lt("created_at", fechaFin)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);
        if (error) throw error;

        const totalPuntos = data?.reduce((total, registro) => total + (registro.puntosObtenidos || 0), 0) || 0;
        return totalPuntos;

    }

    async resultadosTemporadaPorBanda(idBanda: string, anioTemporada: number): Promise<resultadosTemporadaInterface | null> {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }

        try {
            const { data, error } = await dataBaseSupabase
                .from("vista_resultados_temporada")
                .select("*")
                .eq("idForaneaBanda", idBanda)
                .eq("anioTemporada", anioTemporada)
                .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
                .maybeSingle();

            if (error) {
                throw error;
            }

            // Si no hay datos, devuelve null
            if (!data) {
                return null;
            }

            return data as resultadosTemporadaInterface;
        } catch (error) {
            throw error;
        }
    }

    async promedioBandaTemporada(idBanda: string, anio: number, decimales?: number): Promise<number> {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        if (!anio || typeof anio !== 'number' || anio < 1900) {
            throw new Error("Año inválido proporcionado para el cálculo de promedio.");
        }

        // Construir rango para created_at: desde el inicio del año hasta el inicio del siguiente año (exclusive)
        const fechaInicio = new Date(Date.UTC(anio, 0, 1)).toISOString();
        const fechaFin = new Date(Date.UTC(anio + 1, 0, 1)).toISOString();

        // Solicitamos también el idForaneaEvento para poder agrupar por evento
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("puntosObtenidos, idForaneaEvento")
            .eq("idForaneaBanda", idBanda)
            .gte("created_at", fechaInicio)
            .lt("created_at", fechaFin)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

        if (error) throw error;
        if (!data || data.length === 0) {
            return 0;
        }

        // Agrupar por evento y sumar puntos por cada evento
        const puntosPorEvento = new Map<string, number>();
        data.forEach((registro: { idForaneaEvento?: string | null; puntosObtenidos?: number | null }) => {
            const idEvento = registro.idForaneaEvento ?? 'sin_evento';
            const puntos = Number(registro.puntosObtenidos ?? 0) || 0;
            const actual = puntosPorEvento.get(idEvento) || 0;
            puntosPorEvento.set(idEvento, actual + puntos);
        });

        // Calcular promedio entre eventos
        const sumaEventos = Array.from(puntosPorEvento.values()).reduce((t, v) => t + v, 0);
        const cantidadEventos = puntosPorEvento.size;
        if (cantidadEventos === 0) return 0;
        const promedio = sumaEventos / cantidadEventos;

        if (typeof decimales === 'number') {
            return Number(promedio.toFixed(decimales));
        }

        return promedio;
    }

    async posicionTablaBandaTemporada(idBanda: string, anio: number): Promise<number> {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const puntosBanda = await this.puntosTemporadabanda(idBanda, anio);

        // Obtener todas las bandas en la federación
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("idForaneaBanda")
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .neq("idForaneaBanda", idBanda); // Excluir la banda actual
        if (error) throw error;

        const bandasUnicas = Array.from(new Set(data?.map(item => item.idForaneaBanda)));
        let posicion = 1; // Comenzar en posición 1 (mejor posición)

        // Comparar puntos con cada banda
        for (const otraBandaId of bandasUnicas) {
            const puntosOtraBanda = await this.puntosTemporadabanda(otraBandaId, anio);
            if (puntosOtraBanda > puntosBanda) {
                posicion++;
            }
        }
        return posicion;
    }


    async resultadosEventoCategoria(idEvento: string, idCategoria: string): Promise<resultadosEventoInterface[]> {

        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from("vista_resultados_eventos")
            .select("*")
            .eq("idForaneaEvento", idEvento)
            .eq("idForaneaCategoria", idCategoria)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
           
        if (error) throw error;
        return data as resultadosEventoInterface[];

    }
    async getVistaResultadosByIdBanda(idbanda: string): Promise<vistaResultadosModel[]> {

        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from("vista_resultados_generales")
            .select("*")
            .eq("idForaneaBanda", idbanda)
            .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
           
        if (error) throw error;
        return data as vistaResultadosModel[];

    }

     
}
