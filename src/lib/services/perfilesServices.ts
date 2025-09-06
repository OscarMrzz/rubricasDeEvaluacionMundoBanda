import { dataBaseSupabase } from "../supabase";
import { perfilInterface, perfilDatosAmpleosInterface } from "@/interfaces/interfaces";

type Interface = perfilInterface;

const tabla = "perfiles";
const elId = "idPerfil";



export default class PerfilesServices {

   
    async getDatosAmpleos(idFederacion:string): Promise<perfilDatosAmpleosInterface[]> {
        try {
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(` 
                    *,
                    federaciones(*)
          
                `) .eq("idForaneaFederacion", idFederacion);

            if (error) {
                console.error("❌ Error obteniendo bandas con datos completos:", error);
                throw error;
            }

   
            return data as perfilDatosAmpleosInterface[];
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

    async getOne(id: string) {
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("*")
            .eq(elId, id)
            .single();

        if (error) throw error;
        return data;
    }

    async getUsuarioLogiado(): Promise<perfilDatosAmpleosInterface > {
        // Obtiene el usuario logueado desde Supabase Auth
            // Solo ejecuta en el cliente para evitar error de sesión
            if (typeof window === "undefined") {
                throw new Error("No se puede obtener el usuario logueado en el servidor");
            }

            const { data: userData, error: userError } = await dataBaseSupabase.auth.getUser();
            if (userError || !userData?.user) throw userError || new Error("No hay usuario logueado");

            const userId = userData.user.id;

            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select("*, federaciones(*)")
                .eq("idForaneaUser", userId)
                .single();

            if (error) throw error;
            return data as perfilDatosAmpleosInterface ;
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
    async EliminarPerfilDeFederacion(id: string, dataUpdate: Interface) {
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .update(dataUpdate)
            .eq(elId, id)
            .select("*")
            .single();

        if (error) throw error;
        return data;
    }

    async delete(idForaneaUser: string) {
        const { error } = await dataBaseSupabase
            .from(tabla)
            .delete()
            .eq("idForaneaUser", idForaneaUser);

        if (error) throw error;
        return true;
    }
}
