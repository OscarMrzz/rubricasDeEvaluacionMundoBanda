

import {ReactNode} from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full  min-h-screen">
     
      <div className="  w-full px-2 lg:px-48">
        {children}
      </div>
    </div>
  )
}

export default Layout
