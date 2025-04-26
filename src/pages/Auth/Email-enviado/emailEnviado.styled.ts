import styled from "styled-components";

export const ContainerEmailEnviado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Space Grotesk", serif;
`;

export const BoxEmailEnviado = styled.div`
  position: relative;
  width: 450px;
  height: 500px;
  background-color: #1c1c1c;
  border-radius: 50px 5px;
  overflow: hidden;
  user-select: none;


  &::before {
    content: '';
    position: absolute;
    top: -325px;
    left: -300px;
    width: 600px;
    height: 650px;
    background: linear-gradient(60deg, transparent, #3c0566, #7600d3);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -325px;
    left: -300px;
    width: 600px;
    height: 650px;
    background: linear-gradient(60deg, transparent, #ff0084, #b2005c);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .form {
    position: absolute;
    inset: 5px;
    border-radius: 50px 5px;
    background-color: #28292d;
    z-index: 10;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form h2 {
    color: rgb(118, 0, 211);
    text-align: center;
    font-size: 30px;
  }

  .form p {
    display: flex;
    text-align: center;
    margin-top: 30%;
    color: var(--white-100);
    
  }

  .Button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 30%;

    button {
      width: 48%;
      padding: 10px;
      font-size: 12px;
      font-weight: bold;
      border: none;
      border-radius: var(--border-radius-01);
      cursor: pointer;
      color: var(--white-100);
      background-color: var(--hightlight-color-05);
      
      &:hover {
        opacity: 0.7;
      }
    }
  }
 

  /* ===================== Responsividade ===================== */

@media (max-width: 920px), (max-height: 600px) { 
  position: relative;
  width: 350px;
  height: 440px;

  .form h2 {
    font-size: 25px;
  }
}

`;