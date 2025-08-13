"use client";
import React, { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const initialForm = {
  nombre: "",
  alias: "",
  email: "",
  password: "",
  password2: "",
  fechaNacimiento: "",
  sexo: "",
  genero: "",
  
  federacion: "",
  identidad: "",
  numeroTelefono: "",
  direccion: "",
};
const SignUpPage = () => {
  const [form, setForm] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Cuando cambia un input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    if (form.password !== form.password2) {
      setMensaje("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    // 1. Crear usuario en Auth
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMensaje("Error registrando usuario: " + error.message);
      setLoading(false);
      return;
    }

    // 2. Insertar perfil siempre que se cree el usuario
    const userId = data.user?.id;
    if (userId) {
      // SIEMPRE insertar perfil, tenga o no sesión activa
      const { error: perfilError } = await supabase.from("perfiles").insert([{
        
          nombre: form.nombre,
          alias: form.alias,
          fechaNacimiento: form.fechaNacimiento,
          sexo: form.sexo,
          genero: form.genero,
          tipoUsuario: "user",
          federacion: form.federacion,
          identidad: form.identidad,
          numeroTelefono: form.numeroTelefono,
          direccion: form.direccion,
            // ❌ NO agregamos 'id' - se genera automáticamente como Primary Key UUID
          // ✅ SÍ agregamos 'idUser' - es la Foreign Key que conecta con auth.users.id
          idUser: userId,  // Foreign Key: conecta este perfil con el usuario de Auth
        },
      ]);
      
      if (perfilError) {
        console.error(perfilError);
        setMensaje("Usuario creado, pero error al guardar perfil: " + perfilError.message);
      } else {
        // Verificar si hay sesión activa para decidir el mensaje y redirección
        if (data.session) {
          // Usuario creado SIN confirmación de email (sesión activa inmediatamente)
          setMensaje("¡Usuario creado correctamente!");
          router.push("/UsuarioCreadoExitosamentePage");
        } else {
          // Usuario creado CON confirmación de email (necesita confirmar)
          setMensaje("¡Usuario creado! Revisa tu correo para confirmar tu cuenta.");
          router.push("/authPage/UsuarioCreadoExitosamentePage"); // ← ¡AQUÍ FALTABA LA REDIRECCIÓN!
        }
        setForm(initialForm);
      }
    } else {
      setMensaje("Usuario creado, pero no se pudo obtener el ID.");
    }
    setLoading(false);
  };

  return (
    <div className="py-24 px-12">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-100">Crear Usuario</h1>
        <p className="text-gray-400 mt-4">
          Esta es la página para crear un nuevo usuario. Aquí puedes ingresar tus datos para registrarte.
        </p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="nombre">Nombre de Usuario</label>
            <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="alias">Alias</label>
            <input type="text" id="alias" name="alias" value={form.alias} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password2">Confirmar Contraseña</label>
            <input type="password" id="password2" name="password2" value={form.password2} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="sexo">Sexo</label>
            <input type="text" id="sexo" name="sexo" value={form.sexo} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="genero">Género</label>
            <input type="text" id="genero" name="genero" value={form.genero} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
      
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="federacion">federacion</label>
            <input type="text" id="federacion" name="federacion" value={form.federacion} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="identidad">Identidad</label>
            <input type="text" id="identidad" name="identidad" value={form.identidad} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="numeroTelefono">Número de Teléfono</label>
            <input type="text" id="numeroTelefono" name="numeroTelefono" value={form.numeroTelefono} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion" value={form.direccion} onChange={handleChange} className="w-full p-2 bg-gray-700 text-white rounded" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" disabled={loading}>
            {loading ? "Creando..." : "Crear Cuenta"}
          </button>
          {mensaje && <div className="mt-4 text-sm">{mensaje}</div>}
        </form>
      </div>
    </div>
  );
};
export default SignUpPage

