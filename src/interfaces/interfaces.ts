

export interface bandaInterface{
    idBanda:string;
    created_at: string;
    nombreBanda:string;
    aliasBanda:string;
    idForaneaCategoria:string;
    idForaneaRegion:string;

}
export interface  categoriaInterface{
    idCategoria:string;
    created_at: string;
    nombreCategoria:string;
    detallesCategoria:string;
    idForaneaFederacion:string;

}
export interface criterioEvaluacionInterface{
    idCriterio:string;
    created_at: string;
    nombreCriterio:string;
    detallesCriterio:string;
    puntosCriterio:number;
    idForaneaRubrica:string;
}
export interface cumplimientosInterface{
    idCumplimiento:string;
    created_at: string;
    dateCumplimiento:string;
    puntosCumplimiento:number;
    idForaneaCriterio:string;
   
}

export interface federacionInterface{
    idFederacion:string;
    created_at: string;
    nombreFederacion:string;
   
}
export interface penalizacionesInterface{
    idPenalizacion:string;
    created_at: string;
  idForaneaFederacion:string;
  idForaneaCategoria:string;
  nombrePenalizacion:string;
  detallesPenalizacion:string;
  puntosPenalizacion:number;
}

export interface perfilInterface{
    idPerfil:string;
    created_at: string;
  nombre: string;
  alias: string;
  fechaNacimiento: string;
  sexo: string;
  genero: string;
  tipoUsuario: string;
  idForaneaFederacion: string;
  identidad: string;
  numeroTelefono: string;
  direccion: string;
  idForaneaUser:string;

}

export interface regionesInterface{
    idRegion:string;
    created_at: string;
    nombreRegion:string;
 
    idForaneaFederacion:string;
}

export interface registroCumplimientoEvaluacionInterface{
    idRegistroCumplimientoEvaluacion:string;
    created_at: string;
  idForaneaEvento: string;
  idForaneaBanda: string;
  idForaneaCriterio: string;
  idForaneaCumplimiento: string;
  idForaneaCategoria: string;
  idForaneaRegion: string;
  puntosObtenidos: number;
  idForaneauser: string;
}

export interface interfaceRegistroEquipoEvaluador{
    idRegistroEquipoEvaluador:string;
    created_at: string;
  idForaneaFederacion: string;
    idForaneaEvento: string;
    idForaneaRolEvaluador: string;
    idForaneaUser: string;


}

export interface RegistroEventoInterface{
    idRegistroEvento:string;
    created_at: string;
    lugarEvento: string;
    fechaEvento: string;
    idForaneaRegion: string;
    idForaneaFederacion: string;

 
}
export interface registroPenalizacionInterface{
    idRegistroPenalizacion:string;
    created_at: string;
  idForaneaFederacion: string;
  idForaneaEvento: string;
  idForaneaCategoria: string;
  idForaneaBanda: string;
    idForaneaPenalizacion: string;
    puntosPenalizacion: number;
  idForaneaUser: string;

}

export interface registroComentariosInterface{
    idRegistroComentario:string;
    created_at: string;
    idForaneaEvento: string;
    idForaneaBanda: string;
    idForaneaCriterio: string;
    idForaneaCategoria: string;
    idForaneaRegion: string;
    idForaneaUser: string;
    comentario: string;

}

export interface rolEquipoEvaluadorInterface{
    idRol:string;
    created_at: string;
    idForaneaFederacion:string;
    nombreRol:string;
   detallesRol:string;
}

export interface rubricaInterface{
    idRubrica:string;
    created_at: string;
    nombreRubrica:string;
    detallesRubrica:string;
    puntosRubrica:number;
    idForaneaCategoria:string;
    idForaneaFederacion:string;

}


