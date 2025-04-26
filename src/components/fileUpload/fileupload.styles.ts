import styled, { css } from "styled-components";
interface propsFileUpload {
  dragging: boolean;
  uploaded: boolean;
}
export const ContainerFileUploadCS = styled.main<propsFileUpload>`
  /* Estilo padrão */
  border: 1px dashed #ccc;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  transition: border-color 0.3s;
  display: flex;
  flex-direction: column;


  /* Estilo para quando estiver arrastando */
  ${({ dragging }) =>
    dragging &&
    css`
      border-color: #007bff;
      background-color: #eaf5ff;
    `}

  /* Estilo para quando o arquivo foi enviado */
  ${({ uploaded }) =>
    uploaded &&
    css`
      border-color: #28a745;
      background-color: #eaffea;
    `}
`;
