import { dataBaseSupabase } from "../supabase";
import { criterioEvaluacionDatosAmpleosInterface, criterioEvaluacionInterface, perfilInterface } from "@/interfaces/interfaces";

import PerfilesServices from "@/lib/services/perfilesServices";

type Interface = criterioEvaluacionInterface;

const tabla = "criteriosEvalucion";
const elId = "idCriterio";

export default class CriteriosServices   {
  perfil: perfilInterface | null = null;
  private perfilPromise: Promise<void> | null = null;
  
  perfilesServices: PerfilesServices;

constructor() {
    this.perfilesServices = new PerfilesServices();
    this.perfilPromise = this.initPerfil();
    // Inicializa después del constructor
    this.initPerfil();
}

async initPerfil() {
    this.perfil = await this.perfilesServices.getUsuarioLogiado();
}
async ensurePerfil() {
    if (!this.perfil) {
        if (this.perfilPromise) {
            await this.perfilPromise;
        } else {
            await this.initPerfil();
        }
    }
}

    
       

    // 🔹 Trae regiones con su federación (join automático)
async getDatosAmpleos(): Promise<criterioEvaluacionDatosAmpleosInterface[]> {
     await this.ensurePerfil();
    try {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *,
                rubricas(*)
            `)
            

        if (error) {
            console.error("❌ Error obteniendo regiones con federaciones:", error);
            throw error;
        }


        return data as criterioEvaluacionDatosAmpleosInterface[];
    } catch (error) {
        console.error("❌ Error general en getDatosAmpleos:", error);
        throw error;
    }
}

    async get() {
         await this.ensurePerfil();
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
        .from(tabla).select("*")
     
        if (error) throw error;
        return data;
    }

    async getOne(id: string) {
         await this.ensurePerfil();
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("*")
            .eq(elId, id)
        
            .single();

        if (error) throw error;
        return data;
    }


    async create(dataCreate: Interface) {
         await this.ensurePerfil();
        if (!this.perfil || !this.perfil.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .insert(dataCreate)
          
            .select("*")
            .single()

        if (error) throw error;
        return data;
    }

    async update(id: string, dataUpdate: Interface) {
         await this.ensurePerfil();
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .update(dataUpdate)
            .eq(elId, id)
        
            .select("*")
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string) {
         await this.ensurePerfil();
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { error } = await dataBaseSupabase
            .from(tabla)
            .delete()
            .eq(elId, id)
         

        if (error) throw error;
        return true;
    }
}
