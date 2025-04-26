import styled from "styled-components";

export const ContainerAlertCS = styled.div`
  height: auto;
  display: flex;
`;

export const Alert1CS = styled.div`
  background-color: rgb(255, 230, 0, 10%);
  border-radius: var(--border-radius-01);
  border: 1px solid rgb(255, 230, 0);
  color: black !important;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  height: auto;
  align-items: center !important;
  svg {
    font-size: 30px;
    color: rgb(255, 123, 0);
  }

  & p {
    color: rgb(255, 123, 0) !important;
    font-size: 11px !important;
    text-align: center;
    font-weight: 600;
  }
`;

export const Alert2CS = styled.div`
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  z-index: 1000;

  &::before {
    position: absolute;
    content: "";
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgb(18, 18, 20, 60%);
    filter: blur(10px);
  }

  div {
    position: relative;
    background-color: var(--white-100);
    height: 20%;
    width: 20% !important;
    border-radius: var(--border-radius-01);
    z-index: 1001;
    text-align: center;
    display: flex;
    justify-content: center !important;
    padding: 30px;
    flex-direction: column;
    align-items: center !important;

    & h3 {
      color: red;
      margin-bottom: 10px;
    }

    & p {
      color: black !important;
      font-size: 13px;
      font-family: "Poppins";
    }

    & button {
      margin: 5px;
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
      font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;

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
  
  .temporary {
    height: auto;
      width: 50% !important;
    }
`;
