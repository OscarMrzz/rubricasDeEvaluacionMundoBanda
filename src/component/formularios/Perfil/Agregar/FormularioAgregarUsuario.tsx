"use client";

import { activarRefrescarDataEventos } from "@/feacture/Eventos/refrescadorDataEventos";
import { federacionInterface, perfilDatosAmpleosInterface, perfilInterface } from "@/interfaces/interfaces"; // Update the path as needed
import PerfilesServices from "@/lib/services/perfilesServices";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { dataBaseSupabase } from "@/lib/supabase"; // Import supabase client
import { activarRefrescarDataPerfiles } from "@/feacture/Perfil/refrescadorPerfiles";
import FederacionesService from "@/lib/services/federacionesServices";

type Props = {
  onClose: () => void;
};

export default function FormularioAgregarUsuario({ onClose }: Props) {
  const dispatch = useDispatch();
  const [perfilActivo, setPerfilActivo] = useState<perfilDatosAmpleosInterface>();

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
  const [perfil, setPerfil] = useState<perfilDatosAmpleosInterface>({} as perfilDatosAmpleosInterface);
  const [listFederaciones, setListFederaciones] = useState<federacionInterface[]>([]);
  const [federacionSelecionada, setFederacionSeleccionada] = useState<federacionInterface | null>(null);

  const federacionesServices = useRef(new FederacionesService());

  useEffect(() => {
    const fetchFederaciones = async () => {
      try {
        const federaciones = await federacionesServices.current.get();
        if (federaciones) {
          setListFederaciones(federaciones);
        }
      } catch (error) {
        console.error("❌ Error cargando las federaciones:", error);
      }
    };

    fetchFederaciones();
  }, []);

  useEffect(() => {
   const perfilCookie = document.cookie.split(';').find(c => c.trim().startsWith('perfilActivo='));
  const perfilBruto = perfilCookie ? decodeURIComponent(perfilCookie.split('=')[1]) : null;
    if (perfilBruto) {
      const perfil: perfilDatosAmpleosInterface = JSON.parse(perfilBruto);
      if (perfil) {
        setPerfil(perfil);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        if (!perfilActivo || !perfilActivo.idForaneaFederacion) {
          alert("El perfil activo o su federación no está disponible. Intenta de nuevo.");
          setLoading(false);
          return;
        }
        const perfilesServices = new PerfilesServices();
        let federacionAAplicar: string;
        if (perfilActivo.tipoUsuario === "superadmin") {
          federacionAAplicar = federacionSelecionada?.idFederacion ?? "";
        } else {
          federacionAAplicar = perfilActivo.idForaneaFederacion ?? "";
        }

        const nuevoPerfil: Omit<perfilInterface, "idPerfil" | "created_at"> = {
          nombre: formData.nombre,
          alias: formData.alias || "",
          fechaNacimiento: formData.fechaNacimiento || null,
          sexo: formData.sexo || "",
          genero: formData.genero || "",
          idForaneaFederacion: federacionAAplicar,
          identidad: formData.identidad || "",
          numeroTelefono: formData.numeroTelefono || "",
          direccion: formData.direccion || "",
          tipoUsuario: formData.rolUsuario,
          idForaneaUser: userCreadoId,
        };

        await perfilesServices.create(nuevoPerfil as perfilInterface);
      } catch (error) {
        console.error("❌ Error al crear perfil:", error);
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
        dispatch(activarRefrescarDataPerfiles());
        onClose();
      }
    }
  };

  if (!perfilActivo) {
    return <div className="px-25 flex items-center justify-center min-h-[200px]">cargado...</div>;
  }

  const onClickCancelar=()=>{
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
    onClose();
  }

  return (
    <div className="p-2 lg:px-25 ">
      <h2 className="text-2xl font-bold mb-4">Agregar Usuario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {perfilActivo.tipoUsuario === "superadmin" && (
          <div>
            <label className="text-gray-200 mb-1" htmlFor="federacion">
              Federación
            </label>
            <select
              id="federacion"
              name="federacion"
              value={federacionSelecionada ? federacionSelecionada.idFederacion : ""}
              onChange={(e) => {
                const federacion = listFederaciones.find((f) => f.idFederacion === e.target.value) || null;
                setFederacionSeleccionada(federacion);
              }}
              className="border border-gray-200 p-2 rounded w-full"
            >
              <option className="bg-white text-gray-400" value="" disabled>
                {"Federacion"}
              </option>
              {listFederaciones.map((federacion) => (
                <option
                  key={federacion.idFederacion}
                  className="bg-white text-gray-800"
                  value={federacion.idFederacion}
                >
                  {federacion.nombreFederacion}
                </option>
              ))}
            </select>
          </div>
        )}

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
            <option className="bg-white text-gray-400" value="">
              Seleccione un rol
            </option>
            <option className="bg-white text-gray-800" value="admin">
              admin
            </option>
            <option className="bg-white text-gray-800" value="jurado">
              Jurado
            </option>
            <option className="bg-white text-gray-800" value="fiscal">
              Fiscal
            </option>
            <option className="bg-white text-gray-800" value="sinPermisos">
              Sin permisos
            </option>
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
          />
        </div>

        <button
          type="submit"
          disabled={loading || !perfilActivo.idForaneaFederacion}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "cargado..." : "Aceptar"}
                          <button onClick={()=>onClickCancelar()} className="w-full bg-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-700">Cancelar</button>
        </button>
      </form>
    </div>
  );
}
