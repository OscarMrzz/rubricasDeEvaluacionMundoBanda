import { dataBaseSupabase } from "../supabase";
import { rubricaDatosAmpleosInterface, rubricaInterface } from "@/interfaces/interfaces";

type Interface = rubricaInterface;

const tabla = "rubricas";
const elId = "idRubrica";

export default class RubricasServices {
    // 🔹 Trae regiones con su federación (join automático)
    async getDatosAmpleos(): Promise<rubricaDatosAmpleosInterface[]> {
        try {
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(`
                    *,
                    federaciones(*),
                    categorias(*)
                `);

            if (error) {
                console.error("❌ Error obteniendo regiones con federaciones:", error);
                throw error;
            }

            return data as rubricaDatosAmpleosInterface[];
        } catch (error) {
            console.error("❌ Error general en getDatosAmpleos:", error);
            throw error;
        }
    }
    async getPorCategoria(idCategoria: string): Promise<rubricaDatosAmpleosInterface[]> {
        try {
            const { data, error } = await dataBaseSupabase
                .from(tabla)
                .select(`
                    *,
                    federaciones(*),
                    categorias(*)
                `) .eq("idForaneaCategoria", idCategoria);

            if (error) {
                console.error("❌ Error obteniendo regiones con federaciones:", error);
                throw error;
            }

            return data as rubricaDatosAmpleosInterface[];
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
