import React, { useState } from "react";
import styles from "./RegistrationModal.module.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Spinner from "react-spinkit";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Redirect , useHistory} from "react-router-dom";

const RegistrationModal = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log("loading:", isLoading);
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const handleLogin = () => {
    setLogin(!login);
    // console.log(login);
  };
  if (user._id) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className={styles.mainModal}>
        <div className={styles.leftSide}></div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.description}>
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <div className={styles.rightUp}>
            <div id={styles.google}>
              <span className={styles.signIconsG}></span>Continue with Google
            </div>
            <div id={styles.apple}>
              <span className={styles.signIconsA}></span>Continue with Apple
            </div>
            <div className={styles.divider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerText}>or</span>
              <span className={styles.dividerLine}></span>
            </div>
          </div>
          <div className={styles.rightDown}>
            {login ? <Login /> : <SignUp />}

            <div className={styles.afterBtnText2}>
              <span>
                {login ? <span> New to Reddit? </span> : <span> Already a redditor? </span>}{" "}
                <span className={styles.loginChange} onClick={handleLogin}>
                  {login ? (
                    <span style={{ color: "rgb(0, 121, 211)", fontWeight: "bold" }}> SIGN UP </span>
                  ) : (
                    <span style={{ color: "rgb(0, 121, 211)", fontWeight: "bold" }}> LOG IN </span>
                  )}
                </span>
              </span>
            </div>
          </div>
          <button onClick={()=>{history.push("/")}} className={styles.closeModal}>
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.closeModalSvg}
            >
              <polygon 
                fill="inherit"
                points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497"
              ></polygon>
            </svg>
          </button>
        </div>
      </div>
      {isLoading ? (
        <AppLoading>
          <Spinner name="ball-spin-fade-loader" color="#0079D3" fadeIn="none" />
        </AppLoading>
      ) : null}
    </>
  );
};

export default RegistrationModal;

const AppLoading = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
