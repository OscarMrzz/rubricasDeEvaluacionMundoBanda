//-----------BANDAS------------
export interface bandaInterface{
    idBanda:string;
    created_at: string;
    nombreBanda:string;
    aliasBanda:string;
    idForaneaCategoria:string;
    idForaneaRegion:string;
}
export interface bandaDatosAmpleosInterface{
    idBanda:string;

    nombreBanda:string;
    aliasBanda:string;
  

    
    //categoria
    idCategoria:string;
    nombreCategoria:string;
    detallesCategoria:string;
 

    //region
        idRegion:string;
    created_at: string;
    nombreRegion:string;
    idForaneaFederacion:string;


}


//-----------CATEGORIAS------------
export interface categoriaInterface{
    idCategoria:string;
    created_at: string;
    nombreCategoria:string;
    detallesCategoria:string;
    idForaneaFederacion:string;
}
export interface categoriaDatosAmpleosInterface extends categoriaInterface {
    federaciones: federacionInterface;
}

//-----------CRITERIOS------------
export interface criterioEvaluacionInterface{
    idCriterio:string;
    created_at: string;
    nombreCriterio:string;
    detallesCriterio:string;
    puntosCriterio:number;
    idForaneaRubrica:string;
}
export interface criterioEvaluacionDatosAmpleosInterface extends criterioEvaluacionInterface {
    rubricas: rubricaInterface;
}

//-----------CUMPLIMIENTOS------------
export interface cumplimientosInterface{
    idCumplimiento:string;
    created_at: string;
    dateCumplimiento:string;
    puntosCumplimiento:number;
    idForaneaCriterio:string;
}
export interface cumplimientosDatosAmpleosInterface extends cumplimientosInterface {
    criterios: criterioEvaluacionInterface;
}

//-----------FEDERACIONES------------
export interface federacionInterface{
    idFederacion:string;
    created_at: string;
    nombreFederacion:string;
}
// No necesita DatosAmpleos

//-----------PENALIZACIONES------------
export interface penalizacionesInterface{
    idPenalizacion:string;
    created_at: string;
    idForaneaFederacion:string;
    idForaneaCategoria:string;
    nombrePenalizacion:string;
    detallesPenalizacion:string;
    puntosPenalizacion:number;
}

//-----------PERFIL------------
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
export interface perfilDatosAmpleosInterface extends perfilInterface {
    federaciones: federacionInterface;
    // user: userInterface; // Define si tienes userInterface
}

//-----------REGIONES------------
export interface regionesInterface{
    idRegion:string;
    created_at: string;
    nombreRegion:string;
    idForaneaFederacion:string;
}
export interface regionesDatosAmpleosInterface extends regionesInterface {
  
  federaciones: federacionInterface;
}
   


//-----------REGISTRO CUMPLIMIENTO EVALUACION------------
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
export interface registroCumplimientoEvaluacionDatosAmpleosInterface extends registroCumplimientoEvaluacionInterface {
    eventos: RegistroEventoInterface;
    bandas: bandaInterface;
    criterios: criterioEvaluacionInterface;
    cumplimientos: cumplimientosInterface;
    categorias: categoriaInterface;
    regiones: regionesInterface;
    // user: userInterface;
}

//-----------REGISTRO EQUIPO EVALUADOR------------
export interface interfaceRegistroEquipoEvaluador{
    idRegistroEquipoEvaluador:string;
    created_at: string;
    idForaneaFederacion: string;
    idForaneaEvento: string;
    idForaneaRolEvaluador: string;
    idForaneaUser: string;
}
export interface registroEquipoEvaluadorDatosAmpleosInterface extends interfaceRegistroEquipoEvaluador {
    federaciones: federacionInterface;
    eventos: RegistroEventoInterface;
    rolesEvaluador: rolEquipoEvaluadorInterface;
    // user: userInterface;
}

//-----------REGISTRO EVENTO------------
export interface RegistroEventoInterface{
    idRegistroEvento:string;
    created_at: string;
    lugarEvento: string;
    fechaEvento: string;
    idForaneaRegion: string;
    idForaneaFederacion: string;
}
export interface registroEventoDatosAmpleosInterface extends RegistroEventoInterface {
    regiones: regionesInterface;
    federaciones: federacionInterface;
}

//-----------REGISTRO PENALIZACION------------
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
export interface registroPenalizacionDatosAmpleosInterface extends registroPenalizacionInterface {
    federaciones: federacionInterface;
    eventos: RegistroEventoInterface;
    categorias: categoriaInterface;
    bandas: bandaInterface;
    penalizaciones: penalizacionesInterface;
    // user: userInterface;
}

//-----------REGISTRO COMENTARIOS------------
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
export interface registroComentariosDatosAmpleosInterface extends registroComentariosInterface {
    eventos: RegistroEventoInterface;
    bandas: bandaInterface;
    criterios: criterioEvaluacionInterface;
    categorias: categoriaInterface;
    regiones: regionesInterface;
    // user: userInterface;
}

//-----------ROL EQUIPO EVALUADOR------------
export interface rolEquipoEvaluadorInterface{
    idRol:string;
    created_at: string;
    idForaneaFederacion:string;
    nombreRol:string;
    detallesRol:string;
}
export interface rolEquipoEvaluadorDatosAmpleosInterface extends rolEquipoEvaluadorInterface {
    federaciones: federacionInterface;
}

//-----------RUBRICA------------
export interface rubricaInterface{
    idRubrica:string;
    created_at: string;
    nombreRubrica:string;
    detallesRubrica:string;
    puntosRubrica:number;
    idForaneaCategoria:string;
    idForaneaFederacion:string;
}
export interface rubricaDatosAmpleosInterface extends rubricaInterface {
    categorias: categoriaInterface;
    federaciones: federacionInterface;
}