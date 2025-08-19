import { dataBaseSupabase } from "../supabase";
import { categoriaDatosAmpleosInterface, categoriaInterface } from "@/interfaces/interfaces";

type Interface = categoriaInterface;

const tabla = "categorias";
const elId = "idCategoria";

export default class CategoriasServices {
    // 🔹 Trae regiones con su federación (join automático)
    async getDatosAmpleos(): Promise<categoriaDatosAmpleosInterface[]> {
        try {
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(`
                    *,
                    federaciones(*)
                `);

            if (error) {
                console.error("❌ Error obteniendo regiones con federaciones:", error);
                throw error;
            }

            console.log("✅ Regiones con federaciones:", data);
            return data as categoriaDatosAmpleosInterface[];
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
