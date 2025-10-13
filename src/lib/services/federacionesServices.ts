import { dataBaseSupabase } from "../supabase";
import { federacionInterface, perfilDatosAmpleosInterface} from "@/interfaces/interfaces";

type Interface = federacionInterface;

const tabla = "federaciones";
const Elid = "idFederacion";

export default class FederacionesService {
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
 

    async get() {
        const { data, error } = await dataBaseSupabase.from(tabla).select("*")
        if (error) throw error;
        return data;
    }

    async getOne(id: string) {
        const { data, error } = await dataBaseSupabase
            .from(tabla)
            .select("*")
            .eq(Elid, id)
            
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
            .eq(Elid, id)
            .select("*")
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id: string) {
        const { error } = await dataBaseSupabase
            .from(tabla)
            .delete()
            .eq(Elid, id);

        if (error) throw error;
        return true;
    }
}
