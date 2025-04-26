import styled from "styled-components";

export const ContainerTableCS = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    color: white;


  & table {
    margin-top: 30px;
    border-collapse: collapse;
    width: 100%;
    text-align: center;

    & thead {
      background-color: transparent;
      height: 45px;
      font-size: 12px;
      color: white;
      text-transform: uppercase;
      border-top: 1px solid var(--grey-line-02);

      tr {
        th{
          border: 1px solid var(--grey-line-02);
          border-bottom: none;
        }
      }


    }

    & tbody tr {
      height: 45px;
      flex: 0;
      font-size: 13px;
    }

    & tbody tr:nth-child(even) {
      background-color: rgb(0, 0, 0, 10%);
    }
    & tbody tr:nth-child(odd) {
      background-color: #121214;
    }

    & svg {
      cursor: pointer;
    }
  }

  & .pagination {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    & button {
      margin: 3px;
      height: 30px;
      width: 30px;
      cursor: pointer;
      border-radius: 10px;
      border: none;
      background-color: none;
      font-weight: 600;
    }
    & button {
      background-color: var(--pink-button);
      color: white;
    }
    & button:disabled {
      background-color: transparent;
      cursor: not-allowed;
      color: #707070;
      border: 1px solid gainsboro;
      height: 35px;
      width: 35px;
    }
  }
`;

//interface propsFonteDeArrecadacao {
//  value: FontedearrecadacaoMedicinaValues;
//}

/*const arrecadacaoCores: Record<FontedearrecadacaoMedicinaValues, string> = {
  [FontedearrecadacaoMedicina.caixa_economica]: "30, 136, 229", // Azul (Caixa Econômica)
  [FontedearrecadacaoMedicina.cielo]: "244, 67, 54", // Vermelho (Cielo)
  [FontedearrecadacaoMedicina.dinheiro]: "76, 175, 80", // Verde (Dinheiro)
  [FontedearrecadacaoMedicina.inter]: "255, 152, 0", // Laranja (Inter)
  [FontedearrecadacaoMedicina.pix]: "0, 150, 136", // Verde-água (Pix)
  [FontedearrecadacaoMedicina.rede_itau]: "63, 81, 181", // Azul-escuro (Rede Itau)
};

function getCorFonte(fonte: FontedearrecadacaoMedicinaValues): string {
  return arrecadacaoCores[fonte];
}
  */
/*export const FonteDeArrecadacaoCS = styled.p<propsFonteDeArrecadacao>`
  & span {
   padding: 7px 15px 7px 15px;
    border-radius: 10px;
    font-weight: 600;
  }
`;*/
