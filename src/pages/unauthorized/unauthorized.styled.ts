


import styled from "styled-components"

export const ContainerUnauthorized = styled.div`
display: flex;
align-items: center;
justify-content: top;
margin-top: 80px;
flex-direction: column;
color: var(--white-100);
user-select: none;
height: 100vh;
width: 100vw;
overflow-y: hidden;
gap: 20px;
font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

a{
    color: var(--bgk--logo-empresa);

    &:hover{
        opacity: 0.7;
    }
    }

`;

