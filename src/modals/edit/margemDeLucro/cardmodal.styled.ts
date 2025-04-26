import styled from "styled-components";

export const Container = styled.form`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius-01);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);



  p {
    font-family: sans-serif;
    margin-top: 10px;
    font-size: 11px;
    margin-left: 23px;
    font-style: italic;
    color: var(--text-color);
    letter-spacing: 0.7px;
 
  }

  h2 {
    color: black;
    text-transform: uppercase;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--grey-line-01);
  }

  label {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    margin-top: 10px;
    color: var(--grey-text-03);
  }

  input {
    border: none;
    outline: none;
    padding: 10px;
    background-color: var(--white-03);
    border-top-left-radius: var(--border-radius-02);
    border-top-right-radius: var(--border-radius-02);
    border-bottom: 2px solid var(--grey-line-01);
    font-weight: 600;
    color: black;

    &:focus,
    &:hover {
      border-color: var(--hightlight-color);
    }
  }

  .Button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
      padding: 8px;
      width: 100px;
      border-radius: var(--border-radius-02);
      border: none;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.3s;

      &:first-child {
        background-color: #2f8b4b;
        color: white;
      }

      &:last-child {
        background-color: #f90404;
        color: white;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & input {
      width: 100%;
    }

    & label {
      color: black;
    }
    & svg {
      cursor: pointer;
      padding: 3px;
      font-size: 15px;
      border: 1px solid rebeccapurple;
      border-radius: 10px;
      color: transparent;
      margin-right: 10px;
    }
  }
  .check.disable {
    & svg {
      color: transparent;
    }
  }

  .check.active {
    & svg {
      color: white;
      background-color: rebeccapurple;
    }
  }

  .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    border: 1px solid red;
    border-radius: 5px;
    margin-top: 20px;
    font-family: "Space Grotesk";
    font-weight: 700;
    cursor: pointer;
    transition: 0.8s;
    & svg {
      font-size: 30px;
      padding: 5px;

      border-radius: 50px;
    }

    &:hover {
      background-color: red;
      color: white;
    }


  }
`;
