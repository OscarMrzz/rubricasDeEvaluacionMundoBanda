"use client";

import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const NavBard = () => {
  const [sesion, setSesion] = useState<Session | null>(null);

  useEffect(() => {
    // Obtener la sesión actual al montar
    supabase.auth.getSession().then(({ data }) => {
      setSesion(data.session);
    });
    // Suscribirse a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
    });
    // Limpiar el listener al desmontar
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSesion(null);
  };

  return (
    <div className="bg-grey-500/5 backdrop-blur-md h-full w-full flex text-white items-center justify-between px-15">
      <div className='flex gap-20'>
        <div>LOGO</div>
        <div>Nombre Federacion</div>
      </div>
      <div className='flex font-bold text-lg gap-10'>
        {sesion && (
          <Link href="/PanelControlPage">Panel de control</Link>
        )}
        {sesion ? (
          <Link href="/" onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Cerrar sesión</Link>
        ) : (
          <Link href="/authPage/SignInPage">Iniciar sesión</Link>
        )}
      </div>
    </div>
  );
};

export default NavBard;