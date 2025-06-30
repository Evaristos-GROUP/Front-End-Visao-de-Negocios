import styled from "styled-components";

export const PageContainer = styled.div`
 display: flex;
  flex: 1;
  align-items: flex-start;
  flex-direction: column;
  background-color: transparent;
  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  color: white;

  padding: 35px 30px 60px 30px;
  margin: 10px 30px 10px 20px;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionButton = styled.button`
  padding: 10px 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const RelatorioBox = styled.div`
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 16px;
  border-radius: 12px;
`;
