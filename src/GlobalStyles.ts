import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 


  :root{
    
    --bgk--logo-empresa:  rgb(255, 0, 132, 50%);
    --pink-hightlight:rgb(255, 0, 132);
    --hightlight-color :rgb(118, 0, 211);
    --hightlight-color-05:rgb(118, 0, 211, 70%);
    --hightlight-color-02:rgb(118, 0, 211, 5%);
    --hightlight-color-01:rgb(118, 0, 211, 10%);
    --text-color:rgb(105, 105, 105);
    --bgk-black-100:rgb(18, 18, 20);
    --bgk-black-95: rgb(18, 18, 20, 95%);

    --grey-text-01: #A9A9A9;
    --grey-text-02: #d3d3d3;
    --grey-text-03:rgb(112, 112, 112);
    --grey-input-04: #EAEAEA;
    --black-text-1: #000;

    --white-02: rgb(255, 255, 255, 02%);
    --white-03: #f1f1f1;
    --white-100: #FFF;
    
    --border-radius-01: 10px;
    --border-radius-02: 5px;

    --green-button:#2f8b4b;
    --red-button: #F90404;

    --grey-line-01: rgb(211, 211, 211);
    --grey-line-02: rgb(211, 211, 211, 2%);

  }

  *{
  margin: 0;
  list-style: none;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;  
}

  body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis: none;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;



}


`;

export default GlobalStyles;
