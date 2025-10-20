import { bandaDatosAmpleosInterface, categoriaInterface } from "@/interfaces/interfaces";
import React, { useEffect } from "react";
import OverleyModal from "@/component/modales/OverleyModal/Page";
import InformacionBandaComponent from "@/component/informacion/informacionBandaComponent/Page";
import OverleyModalFormulario from "@/component/modales/OverleyModalFormulario/Page";
import FormularioEditarBandaComponent from "@/component/formularios/bandaFormulario/formularioEditarBandaComponent/Page";
 

type Props = {
  bandas: bandaDatosAmpleosInterface[];
    categorias: categoriaInterface[] // Asumiendo que las categorías tienen un campo nombreCategoria
  onRefresh?: () => void; // Función para refrescar los datos
};

const TablaBandasComponent = ({ bandas, categorias, onRefresh }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [openFormEditar, setOpenFormEditar] = React.useState(false);
  const [selectedBanda, setSelectedBanda] =React.useState<bandaDatosAmpleosInterface | null>(null);

  



  const seleccionarFila = (categoria: bandaDatosAmpleosInterface) => {
    setSelectedBanda(categoria);
    setOpen(true);
  };
  const cerrarModal = () => {
    setOpen(false);
  };
  const abrirModalEditar = () => {
    setOpenFormEditar(true);

  };
  

  const cerrarModalEditar = () => {
    setOpenFormEditar(false);
  };
 
  return (
    <>
      <div className=" ">
        <OverleyModal open={open} onClose={cerrarModal}>
          {selectedBanda && (
            <InformacionBandaComponent
              Banda={selectedBanda}
              onClose={cerrarModal}
              onRefresh={onRefresh}
              openFormEditar={abrirModalEditar}
            /> 
          )}
        </OverleyModal>

    <OverleyModalFormulario 
      open={openFormEditar} 
      onClose={cerrarModalEditar} 
    >
      {selectedBanda && (
        <FormularioEditarBandaComponent
          onClose={cerrarModalEditar}
          refresacar={onRefresh ?? (() => {})}
          bandaAEditar={selectedBanda}
        />
      )}
    </OverleyModalFormulario>

    {

    }

     
          
      
     
      </div>
    </>
  );
};

export default TablaBandasComponent;
