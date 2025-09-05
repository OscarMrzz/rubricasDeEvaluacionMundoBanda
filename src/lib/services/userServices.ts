import { dataBaseSupabase } from "../supabase";



export default class UserServices {

    async getAllAuthUsers() {
    try {
        const { data, error } = await dataBaseSupabase.auth.admin.listUsers();
        if (error) throw error;
        return data.users; // Array de usuarios de Supabase Auth
    } catch (error) {
        throw error;
    }
    }


    

    async singUp(email:string, password:string){
        try {
          const { data, error } = await  dataBaseSupabase.auth.signUp({
            email: email,
            password: password,
            
        }); 
        if (error) {
          throw error;
        }else{
            return data;
        }
    
    }
        catch (error) {
          throw error;
        }


    }

  async  singIn(email:string, password:string){
    try{
        const {data,error}= await dataBaseSupabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
            if(error) throw error;
            return data;
    }
         catch(error){
            throw error;
        }
    }



      async upDataAdmin(id:string, datosActualizados: { email?: string; password?: string; data?: object }) {
    try {
      const { data, error } = await dataBaseSupabase.auth.admin.updateUserById(id, datosActualizados);
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }

    async delateAdmin(id:string) {
    try {
      const { error } = await dataBaseSupabase.auth.admin.deleteUser(id);
      if (error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  }

}