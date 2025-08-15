import { dataBaseSupabase } from "../supabase";
// Update the import path to the correct location of the Region interface
import { regionesInterface } from "@/interfaces/interfaces";

type Interface = regionesInterface;


const tabla = "regiones";
export default class RegionService {

    async get(){
      
        const {data,error} = await dataBaseSupabase.from(tabla).select("*");
        
        if(error){
           
            throw error;
        } 
        else{
           
            return data;
        }
            
    }
    async getOne(id: string){
        const {data,error} = await dataBaseSupabase.from(tabla).select("*").eq("id",id).single();
        if(error){
            throw error;
        } 
        else{
            return data;
        }
    }

    async create(dataCreate: Interface){
        const {data,error} = await dataBaseSupabase.from(tabla).insert(dataCreate).select("*").single();
        if(error){
            throw error;
        } 
        else{
            return data;
        }
    }
    async update(id: string, dataUpdate: Interface){
        const {data,error} = await dataBaseSupabase.from(tabla).update(dataUpdate).eq("id",id).select("*").single();
        if(error){
            throw error;
        } 
        else{
            return data;
        }
    }
 async delete(id: string) {
    const { error } = await dataBaseSupabase.from(tabla).delete().eq("id", id);
    if (error){

        throw error;
    }else{

        return true; 
    }
}

}