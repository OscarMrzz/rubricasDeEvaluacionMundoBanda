import React from 'react'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* El ancho responsivo pero para celulares */}
      <div className="">

        {children}
      </div>
    </div>
  )
}

export default layout
