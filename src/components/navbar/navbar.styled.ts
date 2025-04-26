import styled from "styled-components";

interface propsNavbar {
  keyNav: boolean;
}

export const ContainerNavbarCS = styled.nav<propsNavbar>`
  height: 100px;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 100;
  position: fixed;
  background-color: var(--bgk-black-100);
  border-bottom: 1px solid var(--grey-line-02);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  box-shadow: 0.1px 0.1px 15px rgb(0, 0, 0, 5%);

  font-family: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;

  ul {
    height: 100%;
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    li {
      height: 70%;
      width: 70px;
      display: flex;
      margin-left: 5px;

      span {
        height: 100%;
        width: 120%;
        display: flex;

        align-items: center;
        justify-content: center;

        svg {
          font-size: 20px;
          cursor: pointer;
        }
        svg path {
          fill: var(--hightlight-color);
        }
      }

      &:nth-child(2) span {
        border-radius: 50%;
        background: linear-gradient(
          to bottom,
          var(--hightlight-color),
          var(--bgk-black-95)
        );
        font-size: 65px;
        color: white;
        font-weight: 800;
      }

      &:nth-child(3) {
        margin-left: 50px;
      }

      &:nth-child(3) span {
        cursor: pointer;
        text-transform: capitalize;
        color: var(--grey-text-01);
        svg path {
          fill: ${(props) => (props.keyNav ? `flex` : `var(--grey-text-02)`)};
        }
      }

      &:hover {
        p {
          color: var(--grey-text-02);
          user-select: none;
    
        }
      }
    }
  }
`;

export const BoxoptionsCS = styled.div<propsNavbar>`
  height: 283px;
  width: 230px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 120px;
  background-color: var(--white-100);
  border-radius: var(--border-radius-01);
  right: 0;
  padding: 10px;
  & div {
    width: 100%;
    &:first-child {
      display: flex;
      flex-direction: column;
    }

    & span {
      padding: 10px 5px 10px 5px;
      width: 98%;
      display: flex;
      align-items: center;
      border-radius: var(--border-radius-01);
      cursor: pointer;
      &:hover {
        background-color: var(--white-03);
      }

      & svg {
        font-size: 25px;
        margin-right: 10px;
      }

      & p {
        font-weight: 600;
        color: var(--text-color);
      }

      &:hover {
        p {
          color: var(--black-text-1);
        }
      }
    }
    &:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
  
      padding: 10px;
      text-align: center;
      border-top: 1px solid var( --grey-text-02);
      
      
      & p {
        width: 98%;
        font-weight: 700;
        color: #ff0000;
        cursor: pointer;
      }
    }
  }

  display: ${(props) => (props.keyNav ? `flex` : `none`)};
`;
