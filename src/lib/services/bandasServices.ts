import { dataBaseSupabase } from "../supabase";
import { bandaDatosAmpleosInterface,bandaInterface } from "@/interfaces/interfaces";

type Interface = bandaInterface;

const tabla = "bandas";
const elId = "idBanda";

export default class BandasServices {
    // 🔹 Trae bandas con federación, categoría y región (join automático)
    async getDatosAmpleos(): Promise<bandaDatosAmpleosInterface[]> {
        try {
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(` 
                    *,
                    federaciones(*),
                    categorias(*),
                    regiones(*)
                `);

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
}
