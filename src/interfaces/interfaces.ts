//-----------BANDAS------------
export interface bandaInterface{
    idBanda: string;
    created_at: string;
    nombreBanda: string;
    AliasBanda: string; // Corregido: era aliasBanda
    idForaneaCategoria: string;
    idForaneaRegion: string;
    idForaneaFederacion: string;
    ciudadBanda: string;
    urlLogoBanda: string;
    fechaFundacionBanda: string;
    fechaInscripcionAFederacion: string;
    ubicacionSedeBanda: string;

}
export interface bandaDatosAmpleosInterface extends bandaInterface{
    federaciones: federacionInterface;
    categorias: categoriaInterface;
    regiones: regionesInterface;
}

//-----------CATEGORIAS------------
export interface categoriaInterface{
    idCategoria: string;
    created_at: string;
    nombreCategoria: string;
    detallesCategoria: string;
    idForaneaFederacion: string;
}
export interface categoriaDatosAmpleosInterface extends categoriaInterface {
    federaciones: federacionInterface;
}

//-----------CRITERIOS------------
export interface criterioEvaluacionInterface{
    idCriterio: string;
    created_at: string;
    nombreCriterio: string;
    detallesCriterio: string;
    puntosCriterio: number;
    idForaneaRubrica: string;
}
export interface criterioEvaluacionDatosAmpleosInterface extends criterioEvaluacionInterface {
    rubricas: rubricaInterface;
}

//-----------CUMPLIMIENTOS------------
export interface cumplimientosInterface{
    idCumplimiento: string;
    created_at: string;
    detalleCumplimiento: string; // Corregido: era dateCumplimiento
    puntosCumplimiento: number;
    idForaneaCriterio: string;
}
export interface cumplimientosDatosAmpleosInterface extends cumplimientosInterface {
 idCumplimiento: string;
  created_at: string;
  detalleCumplimiento: string;
  puntosCumplimiento: number;
  idForaneaCriterio: string;
  idCriterio: string;
  nombreCriterio: string;
  detallesCriterio: string;
  puntosCriterio: number;
  idForaneaRubrica: string;
  idForaneaFederacion: string;
}

//-----------FEDERACIONES------------
export interface federacionInterface{
    idFederacion: string;
    created_at: string;
    nombreFederacion: string;
}
// No necesita DatosAmpleos

//-----------PENALIZACIONES------------
export interface penalizacionesInterface{
    idPenalizacion: string;
    created_at: string;
    idForaneaFederacion: string;
    idForaneaCategoria: string;
    nombrePenalizacion: string;
    detallesPenalizacion: string;
    puntosPenalizacion: number;
}
export interface penalizacionesDatosAmpleosInterface extends penalizacionesInterface {
    federaciones: federacionInterface;
    categorias: categoriaInterface;
}

//-----------PERFIL------------
export interface perfilInterface{
    idPerfil: string;
    created_at: string;
    nombre: string;
    alias: string;
    fechaNacimiento: string | null;
    genero: string;
    tipoUsuario: string;
    sexo: string;
    idForaneaFederacion: string;
    identidad: string;
    numeroTelefono: string;
    direccion: string;
    idForaneaUser: string;
}
export interface perfilDatosAmpleosInterface extends perfilInterface {
    federaciones: federacionInterface;
}

//-----------REGIONES------------
export interface regionesInterface{
    idRegion: string;
    created_at: string;
    nombreRegion: string;
    idForaneaFederacion: string;
}
export interface regionesDatosAmpleosInterface extends regionesInterface {
    federaciones: federacionInterface;
}

//-----------REGISTRO CUMPLIMIENTO EVALUACION------------
export interface registroCumplimientoEvaluacionInterface{
    idRegistroCumplimientoEvaluacion: string;
    created_at: string;
    idForaneaEvento: string;
    idForaneaBanda: string;
    idForaneaCriterio: string;
    idForaneaCumplimiento: string;
    idForaneaCategoria: string;
    idForaneaRegion: string;
    puntosObtenidos: number;
    idForaneaPerfil: string;
    idForaneaFederacion: string;
    idForaneaRubrica: string;
}
export interface registroCumplimientoEvaluacionDatosAmpleosInterface extends registroCumplimientoEvaluacionInterface {
    registroEventos: RegistroEventoInterface; // Corregido: nombre de tabla
    bandas: bandaInterface;
    criteriosEvalucion: criterioEvaluacionInterface; // Corregido: nombre de tabla
    cumplimientos: cumplimientosInterface;
    categorias: categoriaInterface;
    regiones: regionesInterface;
    perfiles: perfilInterface;
    federaciones: federacionInterface;
    rubricas: rubricaInterface;
}

//-----------REGISTRO EQUIPO EVALUADOR------------
export interface registroEquipoEvaluadorInterface{ // Corregido: nombre de interface
    idRegistroEvaluador: string; // Corregido: nombre de campo
    created_at: string;
    idForaneaEvento: string;
    idForaneaPerfil: string;
  
}
export interface registroEquipoEvaluadorDatosAmpleosInterface extends registroEquipoEvaluadorInterface {

    registroEventos: RegistroEventoInterface;
    perfiles: perfilInterface;

}
//-----------REGISTRO EVENTO------------
export interface RegistroEventoInterface{
    idEvento: string; // Corregido: nombre de campo
    created_at: string;
    LugarEvento: string; // Mantenido con mayúscula como en DB
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
    idRegistroPenalizacion: string;
    created_at: string;
    idForaneaFederacion: string;
    idForaneaEvento: string;
    idForaneaCategoria: string;
    idForaneaBanda: string;
    idForaneaUser: string;
    idForaneaPenalizacion: string;
    puntosPenalizacion: number;
}
export interface registroPenalizacionDatosAmpleosInterface extends registroPenalizacionInterface {
    federaciones: federacionInterface;
    registroEventos: RegistroEventoInterface; // Corregido: nombre de tabla
    categorias: categoriaInterface;
    bandas: bandaInterface;
    penalizaciones: penalizacionesInterface;
}

//-----------REGISTRO COMENTARIOS------------
export interface registroComentariosInterface{
    idRegistroComentario: string;
    created_at: string;
    idForaneaEvento: string;
    idForaneaBanda: string;
  
    idForaneaCategoria: string;
    idForaneaRegion: string;
    idForaneaPerfil: string;
    comentario: string;
    idForaneaRubrica: string;
    idForaneaFederacion: string;
}
export interface registroComentariosDatosAmpleosInterface extends registroComentariosInterface {
    registroEventos: RegistroEventoInterface; // Corregido: nombre de tabla
    bandas: bandaInterface;
    criteriosEvalucion: criterioEvaluacionInterface; // Corregido: nombre de tabla
    categorias: categoriaInterface;
    regiones: regionesInterface;
    perfiles: perfilInterface;
    rubricas: rubricaInterface;
    federaciones: federacionInterface;
}

//-----------ROL EQUIPO EVALUADOR------------
export interface rolEquipoEvaluadorInterface{
    idRol: string;
    created_at: string;
    idForaneaFederacion: string;
    nombreRol: string;
    DetallesRol: string; // Mantenido con mayúscula como en DB
}
export interface rolEquipoEvaluadorDatosAmpleosInterface extends rolEquipoEvaluadorInterface {
    federaciones: federacionInterface;
}

//-----------RUBRICA------------
export interface rubricaInterface{
    idRubrica: string;
    created_at: string;
    nombreRubrica: string;
    datalleRubrica: string; // Mantenido el typo como en DB (debería ser detalleRubrica)
    puntosRubrica: number;
    idForaneaCategoria: string;
    idForaneaFederacion: string;
}
export interface rubricaDatosAmpleosInterface extends rubricaInterface {
    categorias: categoriaInterface;
    federaciones: federacionInterface;
}

export interface resultadosGeneralesInterface{
    banda: bandaInterface;
    evento: RegistroEventoInterface;
    categoria: categoriaInterface;
    region: regionesInterface;
    totalPuntos: number;
}


export interface resultadosTemporadaInterface {
  idForaneaFederacion: string;   // uuid
  idForaneaCategoria: string;    // uuid
  asistenciaEventos: number;     // bigint
  rankinTemporada: number;       // bigint
  anioTemporada: number;         // numeric
  idForaneaBanda: string;        // uuid
  totalTemporada: number;        // double precision
  promedioTemporada: number;     // double precision
  nombreCategoria: string;       // text
  nombreBanda: string;           // text
}


export interface solicitudRevicionInterface {
  idSolicitud: string;
  created_at: string;
  idForaneaRegistroCumplimiento: string;
  idForaneaFederacion: string;
  idForaneaSolicitanteRevicion: string;
  detallesSolicitud: string;
}

export interface solicitudRevicionDatosAmpleosInterface extends solicitudRevicionInterface {
  registroCumplimientos: registroCumplimientoEvaluacionInterface;
  federaciones: federacionInterface;
  perfiles: perfilInterface;
}


export interface respuestaSolicitudRevicionInterface {
  idRespuesta: string;
  created_at: string;
  idForaneaFederacion: string;
  idForaneaSolicitudRevicion: string;
  idForaneaRevisor: string;
  aprovacion: boolean;
  detallesRespuesta: string;
}

export interface respuestaSolicitudRevicionDatosAmpleosInterface extends respuestaSolicitudRevicionInterface {
  federaciones: federacionInterface;
  solicitudReviciones: solicitudRevicionInterface;
  perfiles: perfilInterface;
}

export interface resultadosEventoInterface {
  rankin: number;
  idForaneaEvento: string;
  idForaneaRegion: string;
  idForaneaBanda: string;
  fechaEvento: string; // formato 'YYYY-MM-DD'
  anioEvento: number;
  total: number;
  promedio: number;
  eventosParticipados: number;
  idForaneaFederacion: string;
  idForaneaCategoria: string;
  nombreRegion: string;
  nombreBanda: string;
  nombreCategoria: string;
  LugarEvento: string;
}

export interface resultadosEventoDatosAmpleosInterface extends resultadosEventoInterface {
  registroEventos: RegistroEventoInterface;
  regiones: regionesInterface;
  bandas: bandaInterface;
  federaciones: federacionInterface;
  categorias: categoriaInterface;
}


