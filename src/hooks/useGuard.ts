
import { perfilInterface } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    listaRolesPermitidos: string[];
}

export default function useGuard( { listaRolesPermitidos }: Props) {
   const router =  useRouter();
   React.useEffect(() => {
       const perfilBruto = localStorage.getItem("perfilActivo");
         if (!perfilBruto) {
              router.push("/LoginPage");
                return;
            }
            const perfil: perfilInterface = JSON.parse(perfilBruto);
            if (!listaRolesPermitidos.includes(perfil.tipoUsuario)) {
                if(perfil.tipoUsuario ==="admin") router.push("/PanelControlPage");
                if(perfil.tipoUsuario ==="superadmin") router.push("/PanelControlPage");
                if(perfil.tipoUsuario ==="presidenteJurado") router.push("/PanelControlPage");
                if(perfil.tipoUsuario ==="jurado") router.push("/EvaluarPage");
                if(perfil.tipoUsuario ==="fiscal") router.push("/ReportesPage");
                return;
            }
   }, [listaRolesPermitidos, router]);

}
