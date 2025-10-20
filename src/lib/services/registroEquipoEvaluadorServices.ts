 import { dataBaseSupabase } from "../supabase";
 import { registroEquipoEvaluadorDatosAmpleosInterface, registroEquipoEvaluadorInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
 
 type Interface = registroEquipoEvaluadorInterface;
 
 const tabla = "registroEquipoEvaluador";
 const elId = "idRegistroEvaluador";
 
 export default class RegistroEquipoEvaluadorServices {
   perfil: perfilDatosAmpleosInterface | null = null;
   private perfilInitialized = false;
 
constructor() {
    // No inicializar perfil en constructor para evitar problemas con SSR
}

async initPerfil() {
    if (this.perfilInitialized) return;
    if (typeof window === 'undefined') return; // Solo en el cliente
    
    const perilBruto = localStorage.getItem("perfilActivo");
    if (perilBruto) {
        this.perfil = JSON.parse(perilBruto) as perfilDatosAmpleosInterface;
    }
    this.perfilInitialized = true;
}
     async getDatosAmpleos(idEvento:string): Promise<registroEquipoEvaluadorDatosAmpleosInterface[]> {
         try {
             const { data, error } = await dataBaseSupabase
                 .from(tabla)
                 .select(` 
                     *,
                     registroEventos(*),
                     perfiles(*)
               
                 `).eq("idForaneaEvento", idEvento);
 
             if (error) {
                 console.error("❌ Error obteniendo regiones con equipoEvaluador:", error);
                 throw error;
             }
 
             return data as registroEquipoEvaluadorDatosAmpleosInterface[]
         } catch (error) {
             console.error("❌ Error general en getDatosAmpleos:", error);
             throw error;
         }
     }
 
     async get() {
         const { data, error } = await dataBaseSupabase.from(tabla).select("*");
         if (error) throw error;
         return data;
     }

    async getporPerfil(idUsuario:string) {
        const { data, error } = await dataBaseSupabase.from(tabla).select("*").eq("idForaneaPerfil",idUsuario);
        if (error) throw error;
        
        
        
        return data as registroEquipoEvaluadorInterface[] 
     }
  
 
     async getOne(id: string) {
         const { data, error } = await dataBaseSupabase
             .from(tabla)
             .select("*")
             .eq(elId, id)
             .single();
 
         if (error) throw error;
         return data;
     }
 
     async create(dataCreate: Interface) {
         const { data, error } = await dataBaseSupabase
             .from(tabla)
             .insert(dataCreate)
             .select("*")
             .single();
 
         if (error) throw error;
         return data;
     }
 
     async update(id: string, dataUpdate: Interface) {
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
         const { error } = await dataBaseSupabase
             .from(tabla)
             .delete()
             .eq(elId, id);
 
         if (error) throw error;
         return true;
     }
     async deletePorEvento(idEvento: string) {
         const { error } = await dataBaseSupabase
             .from(tabla)
             .delete()
             .eq("idForaneaEvento", idEvento);
 
         if (error) throw error;
         return true;
     }
 }
 