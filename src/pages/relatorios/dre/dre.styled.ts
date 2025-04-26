import styled from "styled-components";

interface propsDRE {
  selectedINDEX: number;
}

export const ContainerDERPS = styled.div`
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

  h1 {
    position: relative;
    font-size: 25px;
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

  & table {
    margin-top: 30px;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    font-family: 'Poppins';
    & thead {
      tr {
        th {
          color: white;
          height: 80px;
          font-size: 11px;
        }
      }

      .MES-HEAD {
        color: var(--pink-hightlight);
      }
    }
    .values {
      cursor: pointer;
    }

    .index2AH {
      background-color: #ea00ff;
      color: black;
      font-weight: 800;
    }
    .index1AH {
      background-color: #a6ff00;
      color: black;
      font-weight: 800;
    }

    .AV {
      background-color: var(--hightlight-color-02);
      color: var(--hightlight-color);
   
      font-size: 15px;
      font-weight: 600;
    }

    .AH {
      background-color: #000;
      color: var(--pink-hightlight);
      width: 80px;
    }

    .total_footer {
      background-color: #000;
      td {
        color: white;
        height: 80px;
      }
      & .color-pink {
        color: var(--pink-hightlight);
      }
    }

    & tbody tr {
      & td {
        width: auto;
        height: 80px;
        font-size: 13px;
      }
    }

    & span {
      color: rgb(255, 255, 255, 10%);
      font-weight: 300;
    }
  }
`;

export const BoxYear = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  p{
      font-size: 13px;
    }
  & span {
    display: flex;
    align-items: center;
    margin: 20px 20px 20px 20px;
    & div {
      margin-left: 10px;
    }
    & svg {
      margin-left: 10px;
      cursor: pointer;
      padding: 3px;
      font-size: 15px;
      background-color: rebeccapurple;
      border-radius: 10px;
    }

 
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
