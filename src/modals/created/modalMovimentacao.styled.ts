import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 16px;
  }

  label {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    color: #333;
  }

  input, select {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.95rem;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  .actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    button {
      padding: 10px 14px;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 0.95rem;
      transition: 0.2s ease;
    }

    .confirm {
      background-color: #28a745;
      color: white;
    }

    .cancel {
      background-color: #dc3545;
      color: white;
    }

    .confirm:hover {
      background-color: #218838;
    }

    .cancel:hover {
      background-color: #c82333;
    }
  }
`;
