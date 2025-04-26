import styled from "styled-components";


export const MargemDeLucroContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background-color: transparent;
  position: relative;
  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  padding: 35px 30px 60px 30px;
  margin: 10px 30px 10px 20px;

  h1 {
    position: relative;
    font-size: 25px;
    color: white;
  }
  h1::before {
    content: "";
    position: absolute;
    top: -10px;
    width: 500px;
    height: 3px;
    background: linear-gradient(
      to right,
      var(--hightlight-color) 60%,
      transparent 80%
    );
  }


`

export const BoxMonth = styled.div`
  display: flex;
  align-items: center;

  margin-top: 30px;

  p {
    font-size: 13px;
    color: var(--white-100);
  }

  & select {
    border: none;
    background: none;
    margin-left: 10px;

    outline: none;
    padding: 5px;
    width: 150px;
    font-family: "Space Grotesk";
    background-color: transparent;
    border: 1px solid var(--grey-line-01);
    border-radius: 5px;
    font-weight: 600;
    color: white;

    &:focus {
      border-color: var(--hightlight-color);

      &:hover {
        border-color: var(--hightlight-color);
      }

      option {
        color: #000;
      }
    }
  }
`;


export const CardBox = styled.div`

`