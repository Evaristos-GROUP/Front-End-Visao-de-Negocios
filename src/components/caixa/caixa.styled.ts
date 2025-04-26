import styled from "styled-components";

export const ContainerCaixaCS = styled.div`

height: auto;
display: flex;
justify-content: flex-end;
align-items: center;
flex : 1;
width: 100%;
font-family: 'Space Grotesk' , system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
border: 1px solid var(--grey-line-02);
& span{
    color: white;
    border-radius: 10px;
    background-color: var(--white-02);
    padding: 10px;
    font-size: 13px;
    text-align: center;
    margin: 20px 40px 20px -30px;

    & span{
        background: none;
        margin: 0;
        padding: 0;
        color: var(--hightlight-color);
        font-weight: 700;
    }
}

& select{
    height: auto;
    margin-right: 40px;
    outline: none;
    background: none;
    border: none;
    
   color: white;
   border-radius: 10px;
   padding: 10px;
    background-color: var(--white-02);

    & option{
        color: black;
    }
}
`