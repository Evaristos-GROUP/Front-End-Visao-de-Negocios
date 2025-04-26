import styled from "styled-components"

export const ContentNotFound = styled.div`
display: flex;
align-items: center;
justify-content: top;
margin-top: 30px;
flex-direction: column;
color: var(--white-100);
user-select: none;
height: 100vh;
width: 100vw;
overflow-y: hidden;
font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size: 12px;

& img{
    height: 300px;
    
}

div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

a{
    color: var(--bgk--logo-empresa);

    &:hover{
        opacity: 0.7;
    }
    }

`;

export const LinkContent = styled.div`
    display: flex;
    align-items: center;
    justify-items: right;
    flex-direction: column;
   
`;
