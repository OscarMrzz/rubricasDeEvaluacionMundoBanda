import React from 'react'


const regionHomePage = () => {
  return (
    <div>
      <div>
      <h1>Regiones</h1>

      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Region</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes mapear las regiones y mostrarlas */}
            {/* Ejemplo de fila estática */}
            <tr>
              <td>1</td>
              <td>Región Norte</td>
              <td>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Editar</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
   
      
    </div>
  )
}

export default regionHomePage
