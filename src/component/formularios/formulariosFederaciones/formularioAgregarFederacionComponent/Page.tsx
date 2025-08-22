
"use client";
import React from 'react'
import FederacionesServices from "@/lib/services/federacionesServices";
import { federacionInterface } from "@/interfaces/interfaces";

type Props = {
  refresacar: () => void;
  onClose: () => void;
};

//Aqui creare el formulario para agregar federaciones

export default function FormularioAgregarFederacionComponent  ({refresacar, onClose}: Props) {
    const [formData, setFormData] = React.useState({
        nombreFederacion: "",
    });

  const [loading, setLoading] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => 
        {
        const { name, value } = e.target;
      setFormData((prev) => ({...prev,[name]: value, }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
     
    
        try {
          const bandasServices = new FederacionesServices();
          const nuevaFederacion: Omit<federacionInterface, "idFederacion" | "created_at"> = {
            nombreFederacion: formData.nombreFederacion,
          
          };
    
          await bandasServices.create(nuevaFederacion as federacionInterface);
          console.log("✅ Banda creada exitosamente");
    
          // Limpiar formulario
          setFormData({
            nombreFederacion: "",
          
          });
        } catch (error) {
          console.error("❌ Error al crear la banda:", error);
          alert("Error al agregar la banda");
        } finally {
          setLoading(false);
             refresacar();
        onClose();
        }
      };




  // Aquí puedes agregar más funciones para manejar el formulario
  return (
    < >
    <div className='p-25'>


    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Federación</h2>
      <div>
        <label htmlFor="nombreFederacion">Nombre de la Federación</label>
        <input 
          className="border p-2 rounded w-full"
          type="text"
          id="nombreFederacion"
          name="nombreFederacion"
          value={formData.nombreFederacion}
          onChange={handleInputChange}
          required
        />
      </div>
      <button className='bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-50 transition-colors duration-300 cursor-pointer'
       type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Agregar"}
      </button>
    </form>
        </div>

      
    </>
  )
}


