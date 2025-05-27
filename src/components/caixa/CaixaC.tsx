import * as React from 'react';
import { ContainerCaixaCS } from './caixa.styled'
import { informacoesGeraisParaOFrontModel } from '../../types/models/infosGeraisMO';
import { CustomTsDispatch } from '../../hooks/dispatch';
import { getInfosGerais } from '../../slices/infosGerais';

interface propsCaixaC {
    info?: informacoesGeraisParaOFrontModel;
}
const CaixaC: React.FC<propsCaixaC> = (props: propsCaixaC): React.ReactElement => {
    const [selectedMonth, setSelectMonth] = React.useState<string>(new Date().toISOString().slice(0, 7));

    const dispatch = CustomTsDispatch();

    React.useEffect(() => {
        if (selectedMonth) {
            dispatch(getInfosGerais(selectedMonth));
        }
    }, [selectedMonth]);

    return (
        <ContainerCaixaCS>
            <span>Caixa inicial mês<br /> R$ 
                <span>{props.info?.caixa.caixaInicial.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </span>
            </span>
            <span>Caixa total mês<br />R$ 
                <span>{props.info?.caixa.caixaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </span>
            
            <select value={selectedMonth} onChange={(e) => setSelectMonth(e.target.value)}> 
                <option value="" disabled>Selecione o período</option>
                {props.info?.mesesDisponiveis.map((mes, key) => (
                    <option key={key} value={mes}>{mes}</option>
                ))}
            </select>
        </ContainerCaixaCS>
    );
}

export default CaixaC;
