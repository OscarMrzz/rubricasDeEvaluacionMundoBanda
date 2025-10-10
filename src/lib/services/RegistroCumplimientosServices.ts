import { dataBaseSupabase } from "../supabase";
import {  perfilDatosAmpleosInterface, registroCumplimientoEvaluacionDatosAmpleosInterface, registroCumplimientoEvaluacionInterface, resultadosGeneralesInterface } from "@/interfaces/interfaces";




type Interface = registroCumplimientoEvaluacionInterface;

const tabla = "registroCumplimientoEvaluaciones";
const elId = "idRegistroCumplimientoEvaluacion";




export default class  RegistroCumplimientoServices   {
  perfil: perfilDatosAmpleosInterface | null = null;
 
  
constructor() {
  
    this.initPerfil();
}

async initPerfil() {
    const perilBruto = localStorage.getItem("perfilActivo");
    if (perilBruto) {
     
    this.perfil = JSON.parse(perilBruto) as perfilDatosAmpleosInterface;
    }
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
}
