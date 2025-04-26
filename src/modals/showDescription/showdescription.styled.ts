import styled from "styled-components";

interface ContainerShowDescriptionMS {
  showOptions: boolean;
}

export const ContainerShowDescriptionMS = styled.div<ContainerShowDescriptionMS>`
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
  & form {
    width: 0;
    background-color: white;
    position: relative;
    height: 95%;

    display: flex;
    flex-direction: column;
    animation: openModal 0.2s normal linear forwards;
    padding: 10px;
    border-radius: var(--border-radius-01);
    font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;

    h2 {
      color: black;
      text-transform: uppercase;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--grey-line-01);
    }
    & label {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 12px;
      margin-top: 10px;
      color: var(--grey-text-03);
    }

    & p {
      font-size: 12px;
      color: red;
    }
    & input {
      border: none;
      background: none;
      outline: none;
      padding: 10px;
      font-family: "Space Grotesk";

      background-color: var(--white-03);
      border-top-left-radius: var(--border-radius-02);
      border-top-right-radius: var(--border-radius-02);
      border-bottom: 2px solid var(--grey-line-01);
      font-weight: 600;

      &:focus {
        border-color: var(--hightlight-color);

        &:hover {
          border-color: var(--hightlight-color);
        }
      }
      &:hover {
        border-color: var(--hightlight-color-01);
      }
    }

    & main {
      position: absolute;
      display: ${(props) => (props.showOptions ? "flex" : "none")};
      flex-direction: column;
      overflow-y: scroll !important;
      top: 185px;
      height: 210px;
      background-color: white;
      border: 2px solid var(--hightlight-color-01);
      align-items: flex-start;
      justify-content: flex-start;
      border-radius: var(--border-radius-02);
      z-index: 1000;
      padding: 10px;
      background-color: #f1f1f1;

      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-track {
        background: transparent; /* Cor do polegar */
      }

      /* Polegar da barra de rolagem */
      &::-webkit-scrollbar-thumb {
        background: #7600d3; /* Cor do polegar */
        border-radius: 6px; /* Borda arredondada */
      }
    }

    & span {
      color: var(--text-color);
      font-size: 13px;
      height: 30px;
      padding: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: var(--border-radius-01);
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      &:hover {
        background-color: var(--white-03);
        color: black;
      }
    }
    & div {
      display: flex;
      justify-content: space-evenly;
      margin-top: 40px;
      & button {
        padding: 8px;
        width: 70px;
        border-radius: var(--border-radius-02);
        border: none;
        outline: none;
        background-color: none;
        font-size: 11px;
        font-weight: 700;
        color: white;
        text-transform: uppercase;
        background-color: #2f8b4b;
        font-family: "Space Grotesk", system-ui, -apple-system,
          BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
          "Open Sans", "Helvetica Neue", sans-serif;

        cursor: pointer;
        opacity: 0.8;

        &:disabled {
          background-color: var(--text-color);
        }
        &:last-child {
          background-color: #f90404;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
    @keyframes openModal {
      0% {
        width: 0;
        opacity: 0;
        display: none;
      }
      90% {
        display: none;
      }

      100% {
        width: 240px;
        display: flex;
      }
    }
  }
`;

export const BoxShowDescriptionMS = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: rgb(18, 18, 20, 60%);
  filter: blur(10px);
`;
