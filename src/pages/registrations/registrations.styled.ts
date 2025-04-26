import styled from "styled-components";

export const ContainerRegistrationsCS = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background-color: transparent;
  font-family: "Space Grotesk ", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  padding: 35px 30px 60px 30px;
  margin: 10px 30px 10px 20px;
  position: relative;
  & div:first-child {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const BoxRegistrationsCs = styled.div`
  display: flex;
  flex: 1;

  &:first-child {
    display: flex;
    flex-direction: column;
    .optionRegister {
      font-size: 30px;
      font-weight: 600;
      color: white;
      position: relative;
    }

    & .actions {
      display: flex;
      margin: 30px 0px 30px 0px;

      span {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
      }

      & p {
        color: var(--grey-text-01);
        font-weight: 300;
        text-transform: uppercase;
      }

      & span:first-child {
        p {
          width: 120px;
          border-radius: 50px;
          font-style: italic;
          word-wrap: break-word;
          font-size: 10px;
          font-weight: 600;
        }
      }
    }

    & .search {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      input {
        border: none;
        background: none;
        background-color: white;
        border-radius: 10px;
        padding: 15px;
        width: 300px;
        outline: none;

        &::placeholder {
          padding-left: 40px;
          font-weight: 600;
        }
      }
      & svg {
        position: absolute;
        left: 20px;
        font-size: 25px;
      }
    }

    & button {
      padding: 15px;
      width: 150px;
      border-radius: var(--border-radius-01);
      margin-left: 20px;
      border: none;
      outline: none;
      background-color: none;
      font-size: 15px;
      font-weight: 600;
      color: white;
      background-color: #2f8b4b;
      cursor: pointer;
      transition: 0.3s;
      opacity: 0.8;

      &:last-child {
        background-color: #f90404;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  &:last-child {
    display: flex;
    flex-direction: column;
    flex: 1 0;

    & .warning {
      background-color: rgb(251, 230, 0, 5%);
      border: 1px solid #fbe600;
      border-radius: var(--border-radius-01);
      padding: 20px;
      flex: 0 0 100%;
      display: flex;
      flex-direction: column;
      width: 450px;

      & svg {
        margin-right: 5px;
        font-size: 30px;
      }
      p {
        color: #fbe600;
        font-size: 14px;
      }
      & span {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
`;
