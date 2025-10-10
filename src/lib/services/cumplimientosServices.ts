import { dataBaseSupabase } from "../supabase";
import { cumplimientosDatosAmpleosInterface, cumplimientosInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";



type Interface = cumplimientosInterface;

const tabla = "cumplimientos";
const elId = "idCumplimiento";

export default class cumplimientossServices   {
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

    
       

    // 🔹 Trae regiones con su federación (join automático)
async getDatosAmpleos(): Promise<cumplimientosDatosAmpleosInterface[]> {
   
    try {
        if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select(`
                *,
                criteriosEvalucion(*)
            `)


        if (error) {
            console.error("❌ Error obteniendo regiones con cumplimientos:", error);
            throw error;
        }

       
        return data as cumplimientosDatosAmpleosInterface[];
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
