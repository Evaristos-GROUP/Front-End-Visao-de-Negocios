import * as React from "react";
import { ContainerSidebarCS, BoxEmpresa, BoxItemContent, BoxSidebarCS } from "./sidebar.styled";
import LogoEmpresas from "../../assets/logo_amor-saude.png";
import { FcDoughnutChart, FcRatings, FcTodoList, FcAddDatabase } from "react-icons/fc";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const SidebarC: React.FC = (): React.ReactElement => {

  const [minimize, setMinimize] = React.useState<boolean>(false);

  return (
    <ContainerSidebarCS >
      <IoIosArrowForward onClick={() => setMinimize(!minimize)} className="arrowMinimize" />

      <BoxSidebarCS minimize={minimize} >

        <BoxEmpresa>
          <img src={LogoEmpresas} alt="Logo Empresa" />
          <p>Amor Saúde M'boi Mirim</p>
        </BoxEmpresa>

        <BoxItemContent>
          <FcDoughnutChart />
          <Link to={"/"}>Dashboard</Link>
        </BoxItemContent>

        <SidebarItem
          icon={<FcTodoList />}
          title="Relatórios"
          options={[
            { url: "/relatorios/DRE", value: "DRE" },
            { url: "/relatorios/margem-lucro", value: "Margem de lucro" },
            { url: "/relatorios/retiradas-aporte", value: "Retiradas x Aporte" },
            { url: "/relatorios/recebiveis-vendas", value: "Recebíveis x Vendas x Despesas" },
            { url: "/relatorios/mensal", value: "Mensal" },
          ]}
        />

        <SidebarItem
          icon={<FcRatings />}
          title="Lançamentos"
          options={[{ url: "/lancamentos", value: "Lançamentos Gerais" }]}
        />

        <SidebarItem
          icon={<FcAddDatabase />}
          title="Cadastros"
          options={[
            { url: "/cadastros/usuarios", value: "Usuários" },
            { url: "/cadastros/sub-contas", value: "Sub-contas" },
            { url: "/cadastros/fontes-arrecadacao", value: "Fontes de arrecadação" },
          ]} />

      </BoxSidebarCS>
    </ContainerSidebarCS>

  );

};

export default SidebarC;
