import { styled } from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1000;

  form{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  p {
    font-family: sans-serif;
    margin-top: 10px;
    font-size: 11px;
    margin-left: 23px;
    font-style: italic;
    color: var(--text-color);
    letter-spacing: 0.7px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    color: black;
  }

  h2 {
    text-align: center;
    font-size: 1.5rem;
    color: var(--primary);
  }

  input,
  select {
    border: none;
    background: none;
    outline: none;
    padding: 10px;
    width: 100%;
    font-family: "Space Grotesk";
    background-color: var(--white-03);
    border-top-left-radius: var(--border-radius-02);
    border-top-right-radius: var(--border-radius-02);
    border-bottom: 2px solid var(--grey-line-01);
    font-weight: 600;

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

  input::placeholder,
  select::placeholder {
    color: var(--text-color);
    font-size: 15px;
    font-family: "Poppins", serif;
    opacity: 0.7;
  }

  input {
    border: none;
    width: 100%;
    outline: none;
    border: 1px solid var(--grey-dark-02);
    background: var(--grey-dark-02);
    color: var(--white-100);
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
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.3s;
      opacity: 0.8;
    }

    button:first-child {
      background: var(--green-button);
      color: var(--white-100);
      &:hover {
        opacity: 1;
      }
    }

    .cancel-btn {
      background: var(--red-button);
      color: var(--white-100);
      &:hover {
        opacity: 1;
      }
    }
  }

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 300px);
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .showDateOption {
    display: flex;
    align-items: center;

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
  .showDateOption.disable {
    & svg {
      color: transparent;
    }
  }

  .showDateOption.active {
    & svg {
      color: white;
      background-color: rebeccapurple;
    }
  }
  
  label {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    margin-top: 10px;
    color: var(--grey-text-03);
  }

`;
