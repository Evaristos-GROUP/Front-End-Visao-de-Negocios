import styled from "styled-components";

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Space Grotesk", serif;
`;

export const BoxLogin = styled.div`
  position: relative;
  width: 600px;
  height: 650px;
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
    font-size: 40px;
  }

  .form .inputBox {
    position: relative;
    width: 100%;
    margin-top: 30px;
  }

  .form .inputBox input:-webkit-autofill {
  background-color: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  -webkit-text-fill-color: #fff !important; 
  transition: background-color 5000s ease-in-out 0s;
}


  .inputBox i{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: rgb(118, 0, 211);
    border-radius: 10px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }

  .form .inputBox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    border: none;
    outline: none;
    font-size: 18px;
    background: transparent;
    color: #fff;
    letter-spacing: 0.05em;
    z-index: 10;
  }

  .form .inputBox span {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #aaa;
    transition: 0.3s;
  }

  .form .inputBox input:focus ~ span,
  .form .inputBox input:valid ~ span {
    top: 5px;
    font-size: 12px;
    color: #ff0084;
    transform: translateX(-10px) translateY(-30px);
  }

  .form input[type="submit"] {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    color: #fff;
    background: #7600d3;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 50px;
  }

  

  .form input[type="submit"]:hover {
    background: #3c0566;
  }

  .form .links {
    display: flex;
    justify-content: space-between;
  }

  .form .links a {
    color: rgb(105, 105, 105);
    text-decoration: none;
    font-size: 16px;
  }

  .form .links a:hover {
    text-decoration: underline;
    color: #7600d3;
  }
  
  .Logos {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 500px;
    gap: 25px;

    & img { 
      width: 70px;
      height: auto;
    }
  }

  /* ===================== Responsividade ===================== */

@media (max-width: 920px) { 
  position: relative;
  width: 400px;
  height: 580px;

  .form h2 {
    font-size: 30px;
  }

.Logos {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 300px;
    gap: 20px;

    & img { 
      width: 40px;
      height: auto;
    }
  }
}

`;
