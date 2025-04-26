import styled, { keyframes, css } from "styled-components";

interface prospsSidebar {
  keySide?: boolean;
  minimize?: boolean;
}

const openArrow = keyframes`
    0% {
      transform: rotateZ(0);
    }

    100% {
      transform: rotateZ(90deg);
    }
`;

const closeArrow = keyframes`
   
    0% {
      transform: rotateZ(90deg);
    }
    100% {
      transform: rotateZ(0);
    }

`;

export const ContainerSidebarCS = styled.nav`

position: relative;

 & .arrowMinimize{
  position: fixed;
  color: white;
  font-size: 40px;
  background-color: var(--white-02);
  border-radius: 50px;
  left:50px;
  top:30px;
  z-index: 1001;
  cursor: pointer;
 }

`;

export const BoxSidebarCS = styled.nav<prospsSidebar>`
  max-width: 250px;
  min-height: 100%;
  flex: 1 0 7%;
  position: sticky;
  flex-direction: column;
  background-color: var(--bgk-black-95);
  user-select: none;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: ${(props) => props.minimize ? "none" : "block"};
  gap: 20px;

  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    color: white;
`;





export const BoxEmpresa = styled.div`
  display: flex;
  height: 90px;
  border-radius: var(--border-radius-01);
  background: linear-gradient(
    to right,
    var(--bgk--logo-empresa) 60%,
    transparent 80%
  );
  border: solid var(--bgk--logo-empresa);

  font-weight: 600;
  color: var(--white-100);
  justify-content: space-evenly;
  align-items: center;
  font-size: 14px;
  text-align: center;
  svg {
    font-size: 35px;
  }
  & img{
    width: 80px;
  }
`;

export const BoxItemContent = styled.div<prospsSidebar>`
  display: flex;
  width: 100%;
  height: 45px;
  margin-top: 40px;
  padding: 10px;
  border-radius: var(--border-radius-01);
  text-transform: uppercase;
  font-weight: 600;
  opacity: ${(props) => (props.keySide ? 1 : 0.9)};
  & a{

    color: var(--white-100);

  }

  background-color: var(
    ${(props) => (props.keySide ? "--hightlight-color-01" : "none")}
  );

  align-items: center;

  svg {
    font-size: 30px;

    &:last-child {
      animation: ${(props) =>
    !props.keySide
      ? css`
              ${closeArrow} 0.2s linear normal forwards
            `
      : css`
              ${openArrow} 0.2s linear normal forwards
            `};
    }
  }
  & a, p {
    padding: 20px;
    font-size: 14px;
  }

  &:hover {
    background: var(--hightlight-color-01);
    cursor: pointer;
    transition: background 0.3s ease;
    color: var(--white-100);
  
    & a{
      color: var(--white-100);
      
    }
  }
  

`;

const openBoxOptions = keyframes`

    0% {
      opacity: 0;
      height: 0;
    }

    75% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
      display: flex;
    }

`;

const closeBoxOptions = keyframes`

    0% {
      opacity: 1;
    } 75% {
      opacity: 0;
    } 100% {
      height: 0;
      opacity: 0;
      display: none;
    }


`;

export const BoxOptionsCS = styled.div<prospsSidebar>`
  display: flex;
  height: 25px; 
  margin: 15px 0;
  padding: 5px 0;
  width: 100%;
  flex-direction: column;
  align-items: start;

  animation: ${(props) =>
    !props.keySide
      ? css`
          ${closeBoxOptions} 0.1s linear normal forwards
        `
      : css`
          ${openBoxOptions} 0.1s linear normal forwards
        `};

  & a {

    width: 80%;
  
    padding: 10px;
    color: var(--white-100);
    opacity: 0.8;
    position: relative;
    font-size: 13px;

    &:hover {
      opacity: 1;
      border-color: white;
      cursor: pointer;
      background: var(--bgk-black-95);
  
    }
  }
`;
