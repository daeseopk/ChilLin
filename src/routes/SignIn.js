import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../Styles/SignIn.module.css";
import { FcGoogle } from "react-icons/fc";
import { auth, firebaseInstance } from "../firebase";
import firebase from "../firebase";

function SignIn() {
   const [warnMsg, setWarnMsg] = useState([]);
   const [isChecked, setIsChecked] = useState(false);
   const [emailvalue, setEmailValue] = useState("");
   const { register, handleSubmit } = useForm();

   const onGoggleClick = async () => {
      let provider = new firebaseInstance.auth.GoogleAuthProvider();
      const data = await auth.signInWithPopup(provider);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      window.location.replace("/Home");
      if (data.additionalUserInfo) window.sessionStorage.setItem("Login", true);
   };
   useEffect(() => {
      if (window.localStorage.getItem("rememberId")) {
         setEmailValue(window.localStorage.getItem("rememberId"));
         setIsChecked(true);
      }
   }, []);

   const onChange = (e) => {
      if (e.target.checked) {
         setIsChecked(true);
      } else {
         setIsChecked(false);
      }
   };
   const onChange1 = (e) => {
      setEmailValue(e.target.value);
   };

   // TODO : warning message 글씨 크기 키우기 전체적으로 폰트 조정
   const onSubmit = async (d) => {
      if (d.email) {
         if (d.password) {
            try {
               if (
                  (await (
                     await auth.signInWithEmailAndPassword(d.email, d.password)
                  ).operationType) === "signIn"
               ) {
                  setWarnMsg("");
                  firebase
                     .auth()
                     .setPersistence(firebase.auth.Auth.Persistence.SESSION);
                  window.sessionStorage.setItem("Login", true);
                  if (isChecked) {
                     window.localStorage.setItem("rememberId", d.email);
                  } else {
                     window.localStorage.setItem("rememberId", "");
                  }
                  window.location.replace("/Home");
               }
            } catch (error) {
               if (error.code === "auth/wrong-password") {
                  setWarnMsg(["Please enter ", "correct password"]);
               }
               if (error.code === "auth/invalid-email") {
                  setWarnMsg(["Please enter ", "correct email"]);
               }
            }
         } else setWarnMsg(["Please enter your ", "password"]);
      } else setWarnMsg(["Please enter your ", "e-mail"]);
   };
   return (
      <div className={styles.SignInContainer}>
         <div className={styles.Logo}>
            <Link to="/Home">
               <div className={styles.Logo}>
                  <img
                     style={{
                        width: "200px",
                        height: "70px",
                     }}
                     className="Logo"
                     src={require("../Images/Logo.png")}
                     alt="logo"
                  />
               </div>
            </Link>
         </div>
         <div className={styles.SignInBox}>
            <div className={styles.items}>
               <div>
                  <h2 className={styles.signinText}>Sign In</h2>
               </div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                     {...register("email")}
                     onChange={onChange1}
                     className={styles.input}
                     type="text"
                     value={emailvalue}
                     placeholder="Email"
                  />
                  <br />
                  <input
                     {...register("password")}
                     className={styles.input}
                     type="password"
                     placeholder="Password"
                  />
                  <span className={styles.warnMsg}>{warnMsg[0]}</span>
                  <strong className={styles.warnMsg}>{warnMsg[1]}</strong>
                  <button className={styles.SignInBtn} type="submit">
                     Sign In
                  </button>
                  <div
                     style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                     }}>
                     <input
                        onChange={onChange}
                        checked={isChecked}
                        className={styles.Checkbox}
                        id="cb1"
                        type="checkbox"
                     />
                     <label className={styles.RememeberMe} htmlFor="cb1">
                        <span
                           style={{
                              fontSize: "11px",
                              fontWeight: "normal",
                              fontFamily: "NotoSansOriya",
                              color: "#b4b2b2",
                              letterSpacing: "0.3px",
                           }}>
                           Remember Me
                        </span>
                     </label>
                     <span
                        style={{
                           marginLeft: "150px",
                           width: "75px",
                           color: "#b4b2b2",
                           fontSize: "11px",
                           fontWeight: "normal",
                           fontFamily: "NotoSansOriya",
                           marginTop: "4px",
                           cursor: "pointer",
                        }}>
                        Need help?
                     </span>
                  </div>
                  <div onClick={onGoggleClick} className={styles.google}>
                     <FcGoogle
                        style={{
                           width: "14px",
                           height: "14px",
                           marginRight: "4px",
                        }}
                     />
                     <span> Login with Google</span>
                  </div>
                  <span className={styles.SignUp}>
                     New to ChilLin?{" "}
                     <Link className={styles.Link} to="/SignUp">
                        Sign Up
                     </Link>
                  </span>
                  <p
                     style={{
                        marginTop: "30px",
                        opacity: "0.75",
                        fontFamily: "NotoSansOriya",
                        fontSize: "12px",
                        fontWeight: "normal",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: "normal",
                        letterSpacing: "-0.38px",
                        color: "#b4b2b2",
                     }}>
                     This page is protected by Google re CAPTCHA to ensure
                     you're not a bot.{" "}
                     <a style={{ textDecoration: "none" }} href="/">
                        Learn more.
                     </a>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
}

export default SignIn;
