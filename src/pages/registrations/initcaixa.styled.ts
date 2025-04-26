import styled from "styled-components";

export const ContainerInitCaixa = styled.main`
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  display: flex;
  background-color: #f1f1f1;
  font-family: "Space Grotesk";
  top: -10px;
  padding: 30px;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  & span {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & p {
      margin-top: 20px;
      font-size: 17px;
      font-weight: 700;
      color: #303030;
    }

    & input {
      margin-top: 10px;
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
      font-size: 45px;
      text-align: center;
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

    button {
      margin-top: 10px;
      width: 120px;
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      border-radius: var(--border-radius-01);
      cursor: pointer;
      transition: 0.3s;
      &:nth-of-type(1) {
        background-color: var(--green-button);
        color: var(--white-100);
      }
    }
  }

  & img {
    height: 100px;
    width: 100px;
  }
`;
