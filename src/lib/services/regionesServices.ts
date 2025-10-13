import { dataBaseSupabase } from "../supabase";
import { regionesDatosAmpleosInterface, regionesInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";

type Interface = regionesInterface;

const tabla = "regiones";
const elID = "idRegion"

export default class RegionService {
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
   
    async getDatosAmpleos(): Promise<regionesDatosAmpleosInterface[]> {
        try {
             
            if (!this.perfil) {
                throw new Error("Perfil no inicializado");
            }

            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(`
                    *,
                    federaciones(*)
                `).eq("idForaneaFederacion", this.perfil.idForaneaFederacion)

            if (error) {
                console.error("❌ Error obteniendo regiones con federaciones:", error);
                throw error;
            }

         
            return data as regionesDatosAmpleosInterface[];
        } catch (error) {
            console.error("❌ Error general en getDatosAmpleos:", error);
            throw error;
        }
    }

    async get() {
        const { data, error } = await dataBaseSupabase.from(tabla).select("*").eq("idForaneaFederacion", this.perfil?.idForaneaFederacion)
        if (error) throw error;
        return data;
    }

    async getOne(id: string) {

        try {
            if (!this.perfil) {
                throw new Error("Perfil no inicializado");
                
            }

             const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("*")
            .eq(elID , id).eq("idForaneaFederacion", this.perfil.idForaneaFederacion)
            .single();

        if (error) throw error;
        return data;
    }
        catch (error) {
            console.error("❌ Error general en getOne:", error);
            throw error;
        }
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
            .eq(elID , id)
            .select("*")
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string) {
        const { error } = await dataBaseSupabase
            .from(tabla)
            .delete()
            .eq("idRegion", id);

        if (error) throw error;
        return true;
    }
}
