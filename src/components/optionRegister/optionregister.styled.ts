import styled from "styled-components";

interface propsContainerOptionRegisterCS {
  value: string;
}

export const ContainerOptionRegisterCS = styled.main<propsContainerOptionRegisterCS>`
  height: 0 auto;
  display: flex;
  background-color: none;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    color: white;

  &::before {
    content: "";
    height: 3px;
    width: 500px;
    top: -10px;
    position: absolute;
    border-radius: 50px;
    cursor: default;
    background: ${(props) => {
      switch (props.value) {
        case "RECEBÍVEIS":
          return "linear-gradient(to right, #2eff43, transparent 70%)";
        case "DESPESAS":
          return "linear-gradient(to right, #FF3939, transparent 70%)";
        case "VENDAS":
          return "linear-gradient(to right, #2EFFFF, transparent 70%)";
        default:
          return false;
      }
    }};
  }
  & main {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 40px;
    height: 0 auto;
    background-color: white;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-radius: var(--border-radius-01);
    z-index: 1000;
    padding: 10px;
  }

  & span {
    color: var(--text-color);
    font-size: 13px;
    height: 30px;
    padding: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius-01);
    cursor: pointer;
    &:hover {
      background-color: var(--white-03);
      color: black;
    }
  }
`;
