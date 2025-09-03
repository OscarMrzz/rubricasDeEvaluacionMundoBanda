"use client";


import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useDispatch } from 'react-redux'
import PerfilesServices from '@/lib/services/perfilesServices';
import { setPerfilActivo } from '@/feacture/Perfil/PerfilSlice';

const SignInPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setMensaje("Correo o contraseña incorrectos.");
      } else if (error.message.includes("Email not confirmed")) {
        setMensaje("Por favor confirma tu correo antes de iniciar sesión.");
      } else {
        setMensaje("Error al iniciar sesión: " + error.message);
      }
      setLoading(false);
      return;
    }

    // Si hay sesión, redirige al home
    if (data.session) {
      await cargarPerfilUsarioActivo();
      router.push("/");
    }
    setLoading(false);
  };

  const cargarPerfilUsarioActivo = async () => {
    try{
      const perfilServices  = new PerfilesServices();
      const perfil = await perfilServices.getUsuarioLogiado();
      if(perfil){
        dispatch(setPerfilActivo(perfil));
      }
    }
    catch(error){
      console.error("❌ Error cargando el perfil del usuario activo:", error);
    }
    
 
  };
  

  

  return (
    <div className='py-24 px-12'>
      <div className='bg-gray-800 text-white p-8 rounded-lg shadow-md max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-gray-100'>Iniciar Sesión</h1>
        <p className='text-gray-400 mt-4'>
          Esta es la página de inicio de sesión. Aquí puedes ingresar tus credenciales para acceder a tu cuenta.
        </p>
        <form className='mt-8' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-300 mb-2' htmlFor='email'>Correo Electrónico</label>
            <input
              type='email'
              id='email'
              className='w-full p-2 bg-gray-700 text-white rounded'
              placeholder='Ingresa tu correo electrónico'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-300 mb-2' htmlFor='password'>Contraseña</label>
            <input
              type='password'
              id='password'
              className='w-full p-2 bg-gray-700 text-white rounded'
              placeholder='Ingresa tu contraseña'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors'
            disabled={loading}
          >
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>
          {mensaje && <div className="mt-4 text-sm text-red-300">{mensaje}</div>}
        </form>
        <p className='mt-3'>
          ¿No tienes una cuenta?
          <Link href="/authPage/SignUpPage" className="text-blue-300 ml-1">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;