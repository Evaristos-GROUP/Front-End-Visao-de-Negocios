import * as React from "react";
import { ContainerOptionRegisterCS } from "./optionregister.styled";
import { IoMdArrowDropright } from "react-icons/io";

interface propsOptionRegisterC {
  values: string[];
  setIndex: (index: number) => void;
}

const OptionRegisterC: React.FC<propsOptionRegisterC> = (
  props: propsOptionRegisterC
): React.ReactElement => {
  const [valueSelected, setValueSelected] = React.useState<string>("");
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const handleIndex = (index: number | string) => {
    if (typeof index === "number") {
      props.setIndex(index);
    } else if (typeof index === "string" && index === "DEFAULT") {
      props.setIndex(0); // INDEX DEFAULT DO OPTION PARA QUE A TABELA POSSA RENDERIZAR
      setValueSelected("RECEBÍVEIS"); // VALOR DEFAULT DO SELECT
    }
    return "";
  };

  return (
    <ContainerOptionRegisterCS value={valueSelected}>
      <p onClick={() => setShowOptions(!showOptions)} className="valueSelected">
        {valueSelected.trim() !== "" ? valueSelected : handleIndex("DEFAULT")}
      </p>
      {showOptions && (
        <main>
          {props.values.map((value, index) => (
            <span
              key={index}
              onClick={() => {
                setValueSelected(value);
                setShowOptions(!showOptions);
                handleIndex(index);
              }}
            >
              {value}
            </span>
          ))}
        </main>
      )}
      <IoMdArrowDropright />
    </ContainerOptionRegisterCS>
  );
};

export default OptionRegisterC;
