import React from 'react'

const SkeletonTabla = () => {
return (
    <div className=" animate-pulse">

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2 border w-1">N°</th>
            <th className="px-4 py-2 border">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-2 border">
                <div className="h-4 bg-gray-300 rounded w-6"></div>
              </td>
              <td className="px-4 py-2 border">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonTabla
