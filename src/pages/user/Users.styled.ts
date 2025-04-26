import styled from "styled-components";


interface propsUser {
  isActive: boolean;
}

export const ContainerUsersCS = styled.div`
  color: var(--white-100);
  flex: 1;
  padding: 35px 30px 60px 30px;
  margin: 10px 30px 10px 20px;
  font-family: 'Space Grotesk ', system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  h1 {
    position: relative;
    font-size: 25px;
  }
  h1::before {
    content: "";
    position: absolute;
    top: -10px;
    width: 500px;
    height: 3px;
    background: linear-gradient(
      to right,
      var(--hightlight-color) 60%,
      transparent 80%
    );
  }

  h3 {
    margin-top: 70px;
    margin-bottom: 25px;
    font-size: 18px;
    color: var(--grey-text-01);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;

    & thead {
      background-color: transparent;
      height: 45px;
      font-size: 13px;
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




    th {
      color: white;
    }

    td {
  padding: 10px;
  font-size: 12px;
    }

    & tbody tr:nth-child(even) {
      background-color: rgb(0, 0, 0, 10%);
    }
    & tbody tr:nth-child(odd) {
      background-color: #121214;
    }

    button {
      background: none;
      border: none;
      color: var(--white-100);
      cursor: pointer;

      &:hover {
        color: var(--hightlight-color);
  
      }
    }
  }

  @media (max-width: 1200px) {
    h1 {
      font-size: 20px;
    }

    h3 {
      font-size: 16px;
    }

    table {
      font-size: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
    h1 {
      font-size: 15px;
    }

    h3 {
      font-size: 14px;
    }

    table {
      font-size: 10px;
      td {
        padding: 8px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 10px;
    h1 {
      font-size: 15px;
    }

    h3 {
      font-size: 12px;
    }

    table {
      font-size: 8px;
    }
  }
`;

export const ButtonBall = styled.div<propsUser>`
 width: 15px;
  height: 15px;
  margin-left: 45%;
  display: flex;
  justify-content: center;
  position: relative;
 &::after{
  content: '';
  width: 15px;
  height: 15px;

  background: ${(props) =>
  `radial-gradient(circle at 30% 30%, ${
    !props.isActive ? "#ff4d4d, #cc0000" : "#4caf50, #1b5e20"
  })`};
  border-radius: 50%;
  box-shadow: 
    inset -5px -5px 10px rgba(0, 0, 0, 0.3), 
    inset 5px 5px 10px rgba(255, 255, 255, 0.3), 
    5px 5px 10px rgba(0, 0, 0, 0.4); 
  position: absolute;
  cursor: pointer;
  
  
}
&::before {
  content: '';
  position: absolute;
  top: 2px;
  margin-right: 4px;
  z-index: 1;
  width: 5px;
  height: 5px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  border-radius: 30%;
  opacity: 0.9;
}


 
`

export const ContainerRegistration = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: var(--grey-text-01);
  width: 300px;
  height: 100px;
  margin-top: 60px;

  .AddUsuario {
    border-right: solid 3px var(--grey-text-01);
    padding: 25px 30px 0 0;
    height: 100%;
    width: 180px;
    cursor: pointer;


    &:hover {
      color: var(--white-100);
      font-size: 17px;
    }
  }

  .Refresh {
    cursor: pointer;

    &:hover {
      color: var(--white-100);
      font-size: 17px;
    }
  }

  svg {
    cursor: pointer;
    color: var(--white-100);
    font-size: 25px;

    &:hover {
      color: var(--white-100);
      font-size: 30px;
    }
  }

  @media (max-width: 480px) {
    .AddUsuario {
      padding: 15px 20px;
      font-size: 14px;
    }

    .Refresh {
      font-size: 14px;
    }
  }
`;

export const Pagination = styled.div`
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

    @media (max-width: 768px) {
    justify-content: flex-start;
    & button {
      height: 25px;
      width: 25px;
    }}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ModalContent = styled.div`
  margin-left: auto;
  border-radius: var(--border-radius-01);
  background-color: var(--white-100);
  color: var(--bgk-black-100);
  padding: 20px;
  width: 400px;
  height: 95%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-family: "Space Grotesk", serif;
  font-style: bold;


  h2 {
    display: flex;
    margin-bottom: 20px;
    font-size: 35px;
    font-weight: bold;
    color: var(--bgk-black-100);
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 20px;
    color: var(--bgk-black-100);
    }

    input,
    select {
      border: none;
      background: none;
      outline: none;
      padding: 10px;
      width: 100%;
      font-family: "Space Grotesk";
      margin-top: 10px;
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

    input[type="password"]::placeholder {
    color: var(--text-color);
    font-size: 15px;
    font-family: "Poppins", serif;
  
    opacity: 0.7;
}
    input::placeholder,
        select::placeholder {
            color: var(--text-color);
            font-size: 15px;
            font-family: "Poppins", serif;
            opacity: 0.7;
    }


.Button{
  display: flex;
	 justify-content: space-between;
   width: 100%;

  
button {
      padding: 10px;
      width: 150px;
      border-radius: var(--border-radius-01);
    margin: 20px;
      border: none;
      outline: none;
      background-color: none;
      font-size: 15px;
      font-weight: 600;
      color: white;
      background-color: #2f8b4b;
      cursor: pointer;
      opacity: 0.8;

      &:last-child {
        background-color: #f90404;
      }

      &:hover {
        opacity: 1;
      }
    }
    }

    @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px;

    h2 {
      font-size: 28px;
    }

    label {
      font-size: 18px;
    }

    button {
      font-size: 16px;
    }
  }
`;


export const ModalOverlayDelete = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: none;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const ModalContentDelete = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;

  text-align: center;

  h2 {
    font-size: 24px;
    color: var(--red-button);
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: var( --grey-text-03);
    margin-bottom: 24px;
  }

  .Button {
    display: flex;
    justify-content: space-between;
    gap: 16px;

    button {
      width: 40%;
      padding: 10px;
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: var(--border-radius-01);
      cursor: pointer;
    }

    .confirm-btn {
      background-color: var(--green-button);
      color: var(--white-100);

      &:hover {
        opacity: 0.7;
      }
    }

    .cancel-btn {
      background-color: var(--red-button);
      color: white;

      &:hover {
        opacity: 0.7;
    }
}
}
`;