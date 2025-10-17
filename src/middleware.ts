import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const rol = req.cookies.get('rolPerfil')?.value // leer rol desde la cookie
  const { pathname } = req.nextUrl

  // Proteger EvaluarPage solo para admin, superadmin y jurado
  if (pathname.startsWith('/EvaluarPage') && !['admin','superadmin','jurado'].includes(rol || '')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proteger PanelControlPage solo para admin y superadmin
  if (pathname.startsWith('/PanelControlPage') && !['admin','superadmin'].includes(rol || '')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proteger miPerfilPage solo para usuarios autenticados
  if (pathname.startsWith('/miPerfilPage') && !rol) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proteger ReportesPage y reportePorBandaPage solo para admin y superadmin
  if ((pathname.startsWith('/ReportesPage') || pathname.startsWith('/reportePorBandaPage')) && !['admin','superadmin',"fiscal"].includes(rol || '')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if ((pathname.startsWith('/federacionesHomePage') ) && !['superadmin'].includes(rol || '')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proteger rutas de PanelControlPage internas (puedes ajustar los roles según necesidad)
  if (
    pathname.startsWith('/PanelControlPage/bandasHomePage') ||
    pathname.startsWith('/PanelControlPage/categoriasHomePage') ||
    pathname.startsWith('/PanelControlPage/equipoEvaluadorHomePage') ||
    pathname.startsWith('/PanelControlPage/evaluarHomePage') ||
    pathname.startsWith('/PanelControlPage/eventosHomePage') ||
  
    pathname.startsWith('/PanelControlPage/regionHomePage') ||
    pathname.startsWith('/PanelControlPage/reportePorbadaHomePage') ||
    pathname.startsWith('/PanelControlPage/resultadosGeneralesHomePege') ||
    pathname.startsWith('/PanelControlPage/rubricaHomePage') ||
    pathname.startsWith('/PanelControlPage/usuariosHomePage')
  ) {
    if (!['admin','superadmin'].includes(rol || '')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/EvaluarPage/:path*',
    '/PanelControlPage/:path*',
    '/miPerfilPage/:path*',
    '/ReportesPage/:path*',
    '/reportePorBandaPage/:path*'
  ]
}