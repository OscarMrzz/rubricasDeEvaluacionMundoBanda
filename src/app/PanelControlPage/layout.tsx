import SidebarPanelControlComponent from '@/component/SidebarPanelControlComponent/Page'

import {ReactNode} from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full min-h-screen">
        <div className="-500 w-60 ">
            <SidebarPanelControlComponent />

        </div>
      <div className="  w-full">
        {children}
      </div>
    </div>
  )
}

export default Layout
