"use client";

import { activarRefrescarDataEventos } from "@/feacture/Eventos/refrescadorDataEventos";
import {
  perfilDatosAmpleosInterface,
  perfilInterface,
} from "@/interfaces/interfaces"; // Update the path as needed
import PerfilesServices from "@/lib/services/perfilesServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dataBaseSupabase } from "@/lib/supabase"; // Import supabase client

type Props = {
  onClose: () => void;
};

export default function FormularioAgregarUsuario({ onClose }: Props) {
  const dispatch = useDispatch();
  const [perfilActivo, setPerfilActivo] =
    useState<perfilDatosAmpleosInterface>();

  useEffect(() => {
    cargarPerfilActivo();
  }, []);

  const cargarPerfilActivo = async () => {
    try {
      const perfilServices = new PerfilesServices();
      const perfil = await perfilServices.getUsuarioLogiado();
      if (perfil) {
        setPerfilActivo(perfil);
      }
    } catch (error) {
      console.error("❌ Error cargando el perfil activo:", error);
    }
  };

  const [formData, setFormData] = useState({
    nombre: "",
    alias: "",
    email: "",
    password: "",
    password2: "",
    rolUsuario: "",
    fechaNacimiento: "",
    sexo: "",
    genero: "",
    identidad: "",
    numeroTelefono: "",
    direccion: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Crear usuario en Auth
    const { data, error } = await dataBaseSupabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setLoading(false);
      return;
    }
    // 2. Insertar perfil siempre que se cree el usuario
    const userCreadoId = data.user?.id;

    if (userCreadoId) {
      try {
        const perfilesServices = new PerfilesServices();

        const nuevoPerfil: Omit<perfilInterface, "idPerfil" | "created_at"> = {
          nombre: formData.nombre,
          alias: formData.alias,
          fechaNacimiento: formData.fechaNacimiento,
          sexo: formData.sexo,
          genero: formData.genero,
          idForaneaFederacion:
            perfilActivo?.idForaneaFederacion ??
            "3ad8c36d-c54a-4642-bfee-50736e04c991",
          identidad: formData.identidad,
          numeroTelefono: formData.numeroTelefono,
          direccion: formData.direccion,
          tipoUsuario: "user",
          idForaneaUser: userCreadoId,
        };

        await perfilesServices.create(nuevoPerfil as perfilInterface);
      } catch (error) {
        console.error("❌ Error al crear la Evento:", error);
        alert("Error al agregar la Eventos");
      } finally {
        setLoading(false);

        // Limpiar formulario
        setFormData({
          nombre: "",
          alias: "",
          email: "",
          password: "",
          password2: "",
          rolUsuario: "",
          fechaNacimiento: "",
          sexo: "",
          genero: "",
          identidad: "",
          numeroTelefono: "",
          direccion: "",
        });
        dispatch(activarRefrescarDataEventos());
        onClose();
      }
    }
  };

  return (
    <div className="px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Usuario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Nombre completo"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="alias">
            Alias
          </label>
          <input
            type="text"
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Alias o apodo"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="ejemplo@email.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="password2">
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Repite la contraseña"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="rolUsuario">
            Rol Usuario
          </label>
          <select
            id="rolUsuario"
            name="rolUsuario"
            value={formData.rolUsuario}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            required
          >
            <option className="bg-white text-gray-400" value="">Seleccione un rol</option>
            <option className="bg-white text-gray-800" value="presidenteJurado">Presidente jurados</option>
            <option className="bg-white text-gray-800" value="jurado">Jurado</option>
            <option className="bg-white text-gray-800" value="fiscal">Fiscal</option>
            <option className="bg-white text-gray-800" value="sinPermisos">Sin permisos</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="fechaNacimiento">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Fecha de nacimiento"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="sexo">
            Sexo
          </label>
          <input
            type="text"
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Sexo"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="genero">
            Género
          </label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Género"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="identidad">
            Identidad
          </label>
          <input
            type="text"
            id="identidad"
            name="identidad"
            value={formData.identidad}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Identidad"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="numeroTelefono">
            Teléfono
          </label>
          <input
            type="tel"
            id="numeroTelefono"
            name="numeroTelefono"
            value={formData.numeroTelefono}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Número de teléfono"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 mb-1" htmlFor="direccion">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="border border-gray-200 p-2 rounded"
            placeholder="Dirección"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "cargado..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
}
