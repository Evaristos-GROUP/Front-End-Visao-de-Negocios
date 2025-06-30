import React, { useState } from "react";
import {
  PageContainer,
  TopBar,
  ActionButton,
  RelatorioBox,
} from "./movimentacaoFinanceira.styled";
import ModalMovimentacao from "../../modals/created/ModalMovimentacao";

const MovimentacaoFinanceira = (): React.ReactElement => {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <PageContainer>
      <TopBar>
        <h2>Movimentações Financeiras</h2>
        <ActionButton onClick={() => setAbrirModal(true)}>
          Criar Aporte / Retirada
        </ActionButton>
      </TopBar>

      <RelatorioBox>
        {/* Aqui vai o relatório */}
        <p>Lista de aportes e retiradas...</p>
      </RelatorioBox>

      {abrirModal && <ModalMovimentacao onClose={() => setAbrirModal(false)} />}
    </PageContainer>
  );
};

export default MovimentacaoFinanceira;
