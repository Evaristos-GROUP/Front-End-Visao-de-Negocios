import * as React from "react";
import * as Redux from "react-redux";
import {
  ContainerShowDescriptionMS,
  BoxShowDescriptionMS,
} from "./showdescription.styled";
import { normalizeFonteDeArrecadacao, normalizeSubConta } from "../../utils/normalizer";
import AlertC from "../../components/alert/AlertC";
import { CustomTsDispatch } from "../../hooks/dispatch";
import { updateList } from "../../slices/RegistrationsSL";
import { toast } from "react-toastify";
import { RootState } from "../../store";

interface Props {
  item: any; 
  showModal: () => void;
}

const ShowDescriptionM: React.FC<Props> = ({ item, showModal }) => {
  const dispatch = CustomTsDispatch();
  const stateInfoGerais = Redux.useSelector((state: RootState) => state.infosGeraisStore);

  const [value, setValue] = React.useState<number>(item.valor);
  const [subConta, setSubConta] = React.useState<string>("sub_conta" in item ? item.sub_conta || "" : "");
  const [formaDeArrecadacao, setFormaDeArrecadacao] = React.useState<string>(
    "fonte_de_arrecadacao" in item ? item.fonte_de_arrecadacao || "" : ""
  );
  const [description, setDescription] = React.useState<string>(item.descricao || "");
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);

  const handleEdit = () => {
    const updatedItem = { ...item };

    if ("fonte_de_arrecadacao" in updatedItem) {
      updatedItem.fonte_de_arrecadacao = normalizeFonteDeArrecadacao(
        formaDeArrecadacao,
        stateInfoGerais.infosGerais!.fonte_arrecadacoes
      );
    }

    if ("sub_conta" in updatedItem) {
      updatedItem.sub_conta = normalizeSubConta(subConta, stateInfoGerais.infosGerais!.sub_contas);
    }


    updatedItem.valor = value;
    updatedItem.descricao = description;

    try {
      dispatch(updateList(updatedItem));
      showModal();
      toast.success(`Item atualizado com sucesso.`);
    } catch (error) {
      console.error(error);
    }
  };

  const getFormFields = () => (
    <>
   

      <label htmlFor="Valor">Valor</label>
      <input type="number" id="Valor" value={value} onChange={handleChange(setValue)} />
      {value <= 0 && <p>* O valor não pode ser 0 (Zero).</p>}

      {"sub_conta" in item ? (
        <>
          <label htmlFor="SubConta">Sub conta</label>
          <input type="text" value={subConta} onClick={() => setShowOptions(!showOptions)} />
          {showOptions && (
            <main>
              {stateInfoGerais.infosGerais!.sub_contas.map((value, index) => (
                <span key={index} onClick={() => { setSubConta(value.nome); setShowOptions(false); }}>
                  {value.nome}
                </span>
              ))}
            </main>
          )}
        </>
      ) : (
        <>
          <label htmlFor="FormaDeArrecadacao">Forma de arrecadação</label>
          <input type="text" value={formaDeArrecadacao} onClick={() => setShowOptions(!showOptions)} />
          {showOptions && (
            <main>
              {stateInfoGerais.infosGerais!.fonte_arrecadacoes.map((value, index) => (
                <span key={index} onClick={() => { setFormaDeArrecadacao(value); setShowOptions(false); }}>
                  {value}
                </span>
              ))}
            </main>
          )}
        </>
      )}

      <label htmlFor="Descrição">Descrição</label>
      <input type="text" value={description} onChange={handleChange(setDescription)} />
    </>
  );

  return (
    <ContainerShowDescriptionMS showOptions={showOptions}>
      <BoxShowDescriptionMS onClick={showModal} />
      <form action="submit">
        <h2>Edição</h2>
        {getFormFields()}
        <div>
          <button type="button" onClick={handleEdit} disabled={value <= 0 }>
            Concluir
          </button>
          <button onClick={showModal}>Cancelar</button>
        </div>
        <AlertC option={1} showAlert={() => null} handleSubmit={() => null} />
      </form>
    </ContainerShowDescriptionMS>
  );
};

export default ShowDescriptionM;
