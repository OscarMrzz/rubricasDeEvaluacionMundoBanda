import { dataBaseSupabase } from "../supabase";
import { criterioEvaluacionDatosAmpleosInterface, criterioEvaluacionInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";



type Interface = criterioEvaluacionInterface;

const tabla = "criteriosEvalucion";
const elId = "idCriterio";

export default class CriteriosServices   {
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



    
       


async getDatosAmpleos(): Promise<criterioEvaluacionDatosAmpleosInterface[]> {
     
    try {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *,
                rubricas(*)
            `).eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            

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
         
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
        .from(tabla).select("*").eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
     
        if (error) throw error;
        return data;
    }

    async getOne(id: string) {
         
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
