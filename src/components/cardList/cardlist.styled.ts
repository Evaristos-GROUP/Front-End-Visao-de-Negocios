import styled from "styled-components";

type propsCardType = {
  type: string;
};

export const CardBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1;

  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 14px;
  }
`;

export const BoxTotalValues = styled.div`
  display: flex;
  color: gray;
  font-size: 12px;

  & p {
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-style: italic;
    font-family: sans-serif;
    flex-wrap: nowrap;
    & span {
      background-color: rgb(255, 255, 255, 10%);
      padding: 6px;
      margin: 5px;
      border-radius: 8px;
      font-family: "Space Grotesk";
      font-weight: 600;
      color: limegreen;
    }
  }
`;

export const TabButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
  margin-top: 20px;
  div {
    display: flex;
    gap: 8px;
  }

  button {
    background-color: transparent;
    border: none;
    border: 1px solid rgb(255, 255, 255, 3%);
    color: #f1f1f1;
    outline: none;
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 8px;

    &.active {
      border: none;
      color: #fff;
      background-color: rgb(255, 255, 255, 10%);
      font-weight: 600;
    }
  }

  span {
    display: flex;
    align-items: center;

    gap: 8px;
    cursor: pointer;

    svg {
      color: white;
      font-size: 20px;
    }

    p {
      color: #fff;
    }
  }
`;
export const CardBox = styled.div<propsCardType>`
  background-color: #1e1e1e;
  color: #fff;
  width: 240px;
  height: 220px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 110%;
    height: 30%;

    background-color: ${(props) => props.type == "CONSULTA" ? "rgb(118, 0, 211)": 'limegreen'};
    top: -30px;
    z-index: -1;
  }
  &::after {
    content: "";
    position: absolute;
    width: 130%;
    height: 100%;
    background-color: #000;
    box-shadow: 0px -30px 0px rgb(255, 255, 255, 5%);
    top: 70px;
    z-index: -2;
    border-radius: 50%;
  }
  &:hover {
    cursor: pointer;
    &::after {
      border: none;

      animation: up 1s normal ease-out forwards;
    }

    @keyframes up {
      0% {
        top: 200px;
      }
      100% {
        top: 70px;
      }
    }
  }

  p {
    font-size: 14px;
  }

  & div {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 20px;

    & .spanbox {
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(255, 255, 255, 20%);
      border-radius: 30px;
      & svg {
        margin-right: 5px;
        font-size: 25px;
      }

      & p {
        font-size: 14px;
      }
    }
  }

  & span {
    margin-top: 10px;
    text-align: center;
  }
  .edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: white;
  }

  .negativo {
    color: red;
    font-weight: 700;
  }
  .positivo {
    color: limegreen;
    font-weight: 700;
  }

  .header {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    color: white;
    font-weight: 700;
  }
`;
