import styled from "styled-components";

interface propsDashboard {
  colorString?: string;
}

export const ContainerDashboardPS = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  background-color: transparent;
  font-family: "Space Grotesk ", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
`;

export const BoxContentPs = styled.div<propsDashboard>`
  padding: 60px 30px 60px 30px;
  margin: 10px 30px 10px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white-02);
  border-radius: var(--border-radius-01);
  font-family:'Space Grotesk';
  border: solid 1px ${(props) => `${props.colorString}6`};
  position: relative;
  overflow: hidden;
  & span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 2;
    width: 100%;
    &:first-child {
      & p {
        font-size: 20px;
        color: white;
      }
    }

    &:nth-child(2) {
      font-size: 35px;
      font-weight: 800;
      color: white;


      & p {
        margin-left: 10px;
        color: ${(props) => props.colorString};
        &:first-child{
          font-weight: 500;
          color:white;
          margin-left: 0px;
       
        }
      }

    }

    & svg {
      font-size: 35px;
      margin-left: 10px;
    }
  }

  & img {
    position: absolute;
    width: 200px;
    right: -30px;
    z-index: 1;
    opacity: 0.03;
  }
`;

export const BoxDashboardPS = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid var(--grey-line-02);
`;

export const BoxContentChartsPS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 30px 10px 20px;

  &:nth-child(1) {
    & span {
      width: 35%;
    }
    & span {
      height: 100%;

      &:nth-child(2) {
        width: 66%;

        & .bug {
          border-radius: var(--border-radius-01);
          background-color: var(--white-02);
        }
      }
    }
  }

  &:last-child {
    .onlyChild {
      width: 100%;
      background-color: var(--white-02);
      border-radius: var(--border-radius-01);
    }
  }

  & p {
    font-size: 12px;
    font-style: italic;
    color: var(--grey-text-01);
    text-align: center;
    padding: 10px;
  }
`;

export const BoxDashboardChartsPS = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
