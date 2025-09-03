 import { dataBaseSupabase } from "../supabase";
 import { perfilInterface, registroEventoDatosAmpleosInterface, RegistroEventoInterface } from "@/interfaces/interfaces";
 
 import PerfilesServices from "@/lib/services/perfilesServices";
 
 type Interface = RegistroEventoInterface; 
 
 const tabla = "registroEventos";
 const elId = "idEvento";
 
 export default class RegistroEventossServices   {
   perfil: perfilInterface | null = null;
   private perfilPromise: Promise<void> | null = null;
   
   perfilesServices: PerfilesServices;
 
 constructor() {
     this.perfilesServices = new PerfilesServices();
     this.perfilPromise = this.initPerfil();

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
 async getDatosAmpleos(): Promise<registroEventoDatosAmpleosInterface[]> {
      await this.ensurePerfil();
     try {
         if (!this.perfil?.idForaneaFederacion) {
             throw new Error("No hay federación en el perfil del usuario.");
         }
         const { data, error } = await dataBaseSupabase
             .from(tabla)
             .select(`
                 *,
                 federaciones(*),
                 regiones(*)
             `)
             .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
             .order("fechaEvento", { ascending: true });
 
         if (error) {
             console.error("❌ Error obteniendo regiones con federaciones:", error);
             throw error;
         }
 
      
         return data as registroEventoDatosAmpleosInterface[];
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
         .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);
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
             .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
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
             .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
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
             .eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
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
             .eq("idForaneaFederacion", this.perfil.idForaneaFederacion);
 
         if (error) throw error;
         return true;
     }
 }
 