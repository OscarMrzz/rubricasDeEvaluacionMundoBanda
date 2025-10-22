import { dataBaseSupabase } from "../supabase";
import { bandaDatosAmpleosInterface,bandaInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";
import PerfilesServices from "./perfilesServices";

type Interface = bandaInterface;

const tabla = "bandas";
const elId = "idBanda";

export default class BandasServices {

     perfil: perfilDatosAmpleosInterface | null = null;
      
    
    constructor() {
    
        this.initPerfil()
    }
     
    async initPerfil() {

        
        const perfilCookie = document.cookie.split(';').find(c => c.trim().startsWith('perfilActivo='));
        const perfilBruto = perfilCookie ? decodeURIComponent(perfilCookie.split('=')[1]) : null;
        if (perfilBruto) {
         
        this.perfil = JSON.parse(perfilBruto) as perfilDatosAmpleosInterface;
        }else{
            const perfilServices = new PerfilesServices();
            this.perfil = await perfilServices.getUsuarioLogiado() as perfilDatosAmpleosInterface;

        }
    }

    async getDatosAmpleos(): Promise<bandaDatosAmpleosInterface[]> {


        try {

              if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(` 
                    *,
                    federaciones(*),
                    categorias(*),
                    regiones(*)
                `).eq("idForaneaFederacion", this.perfil.idForaneaFederacion);

            if (error) {
                console.error("❌ Error obteniendo bandas con datos completos:", error);
                throw error;
            }

        
            return data as bandaDatosAmpleosInterface[];
        } catch (error) {
            console.error("❌ Error general en getDatosAmpleos:", error);
            throw error;
        }
    }

    async get() {
        try{

              if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
            const { data, error } = await dataBaseSupabase.from(tabla).select("*").eq("idForaneaFederacion", this.perfil.idForaneaFederacion);
        if (error) throw error;
        return data;

        }
        catch(error){
            console.error("❌ Error general en get:", error);
            throw error;
        }
        
    }

    async getOne(id: string) {
        try{
              if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }

   const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("*")
            .eq(elId, id).eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .single();

        if (error) throw error;
        return data;

        }
        catch(error){
            console.error("❌ Error general en getOne:", error);
            throw error;
        }
     
    }

    async create(dataCreate: Interface) {
        try{

                if (!this.perfil?.idForaneaFederacion) {
            throw new Error("No hay federación en el perfil del usuario.");
        }
            
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .insert(dataCreate)
            .select("*")
            .single();

        if (error) throw error;
        return data;


        }
        catch(error){
            console.error("❌ Error general en create:", error);
            throw error;
        }


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


    async subirLogoBanda(file: File, nombreArchivo: string): Promise<string | null> {

        const nombreFinal = `${nombreArchivo}`;
        const { data, error } = await dataBaseSupabase.storage
            .from('imgLogoBandas')
            .upload(nombreFinal , file, {
                cacheControl: '3600',
                upsert: true
            });
        if (error) {
            console.error("❌ Error subiendo el logo de la banda:", error);
            throw error;
        }
        return data.path;
    }
       

    async obtenerUrlLogoBanda(path: string): Promise<string | null> {
        if(!path || path===""){
            return "";
        }

        const { data } = await dataBaseSupabase.storage
            .from('imgLogoBandas')
            .createSignedUrl(path, 60*60*24*365);

        return data?.signedUrl ?? "";
    }

    async editarLogoBanda(file: File, nombreArchivo: string): Promise<string | null> {

        const nombreFinal = `${nombreArchivo}`;
        const { data, error } = await dataBaseSupabase.storage
            .from('imgLogoBandas')
            .update(nombreFinal , file, {
                cacheControl: '3600',
                upsert: true
            });
        if (error) {
            console.error("❌ Error editando el logo de la banda:", error);
            throw error;
        }
        return data.path;
    }

}
