

import {ReactNode} from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="pt-35 px-4 lg:px-90 w-full  min-h-screen ">
     
        {children}
 
    </div>
  )
}

export default Layout
