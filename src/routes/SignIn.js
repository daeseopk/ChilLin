import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../Styles/SignIn.module.css";
import useStore from "../Store.js";

function SignIn() {
   const [user, setUser] = useState({});
   const [warnMsg, setWarnMsg] = useState([]);
   const { register, handleSubmit } = useForm();
   const state = useStore();

   useEffect(() => {
      const fetchUserInfo = async () => {
         try {
            const result = await axios.get(
               "https://movieweb-2b841-default-rtdb.firebaseio.com/userInfo.json"
            );
            setUser(result.data);
         } catch (error) {
            alert(error);
            console.log(error);
         }
      };
      fetchUserInfo();
   }, []);

   const WarnPwd = ["Please enter your ", "password"];
   const WarnEmail = ["Please enter your ", "e-mail"];
   const WarnAccount = ["You have entered the wrong ", "e-mail or password"];
   const onSubmit = (d) => {
      if (d.email) {
         if (d.password) {
            for (let i = 0; i < user.length; i++) {
               if (
                  user[i].email === d.email &&
                  user[i].passWord === d.password
               ) {
                  setWarnMsg("");
                  window.sessionStorage.setItem("Login", true);
                  alert(`Welcome ${user[i].userName}!`);
                  window.location.replace("/Home");
                  break;
               } else setWarnMsg(WarnAccount);
            }
         } else setWarnMsg(WarnPwd);
      } else setWarnMsg(WarnEmail);
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
                     className={styles.input}
                     type="text"
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
                  <div className={styles.google}>
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
