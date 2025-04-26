import React from "react";
import GlobalStyles from "./GlobalStyles";
import "./App.css";
import Routes from "./Routes";
import "react-toastify/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";
import * as Redux from "react-redux";
import { RootState } from "./store";
const App = (): React.ReactElement => {
  const authStates = Redux.useSelector((state: RootState) => state.authStore);

  return (
    <div
      id="id_app"
      style={
        authStates.auth === null ? { marginTop: "0px" } : { marginTop: "100px" }
      }
    >
      <SkeletonTheme baseColor="#202020" highlightColor="#242424">
        <Routes />

        <GlobalStyles />
      </SkeletonTheme>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
