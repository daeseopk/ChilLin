import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "../Styles/SignUp.module.css";
import { auth } from "../firebase";

function SignUp() {
   const [passWord, setPassWord] = useState("");
   const [verify, setVerify] = useState("");
   const [verifyChecked, setVerifyChecked] = useState(false);
   const { register, handleSubmit } = useForm();

   const isEmail = (email) => {
      const emailRegex =
         // eslint-disable-next-line no-useless-escape
         /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      return emailRegex.test(email);
   };
   const onSubmit = async (d) => {
      var userName = d.firstName + d.lastName;
      var email = d.email;
      var passWord = d.password;
      if (userName) {
         if (isEmail(email)) {
            if (passWord) {
               if (verifyChecked) {
                  if (pwdCheck(passWord)) {
                     try {
                        await auth.createUserWithEmailAndPassword(
                           email,
                           passWord
                        );
                        alert("회원가입이 완료되었습니다.");
                        window.location.replace("/Home");
                     } catch (error) {
                        if (error.code === "auth/email-already-in-use") {
                           alert("이미 존재하는 이메일 입니다.");
                        } else alert(error);
                     }
                  }
               } else alert("비밀번호가 일치하는지 확인해 주세요.");
            } else alert("비밀번호를 입력해 주세요.");
         } else alert("올바른 이메일을 입력해 주세요.");
      } else alert("이름을 입력해 주세요");
   };
   function pwdCheck(passWord) {
      var num = passWord.search(/[0-9]/g);
      var eng = passWord.search(/[a-z]/gi);
      var spe = passWord.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

      if (passWord.length < 8 || 20 < passWord.length) {
         alert("8 ~ 20자리 이내로 입력해 주세요.");
         return false;
      } else if (passWord.search(/\s/) !== -1) {
         alert("비밀번호는 공백 없이 입력해주세요.");
         return false;
      } else if (num < 0 || eng < 0 || spe < 0) {
         alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
         return false;
      } else return true;
   }
   const onChange = (e) => {
      if (e.target.name === "password") {
         setPassWord(e.target.value);
         if (verify === e.target.value) {
            setVerifyChecked(true);
         } else setVerifyChecked(false);
      }
      if (e.target.name === "verifyPassword") {
         setVerify(e.target.value);
         if (passWord === e.target.value) {
            setVerifyChecked(true);
         } else setVerifyChecked(false);
      }
   };
   return (
      <div className={styles.signUpContainer}>
         <div
            style={{
               zIndex: "1",
               position: "absolute",
               width: "35%",
               height: "600px",
               transform: "translate(20%,25%)",
            }}>
            <Link to="/Home">
               <div className={styles.Logo}>
                  <img
                     style={{
                        width: "300px",
                        height: "100px",
                     }}
                     className="Logo"
                     src={require("../Images/Logo.png")}
                     alt="logo"
                  />
               </div>
            </Link>
            <h1
               style={{
                  width: "410px",
                  marginBottom: "10px",
                  fontSize: "45px",
                  marginLeft: "7%",
                  color: "white",
                  letterSpacing: "0.58px",
                  fontWeight: "bold",
                  fontFamily: "NotoSansKannada",
               }}>
               Create new account
            </h1>
            <form
               onSubmit={handleSubmit(onSubmit)}
               style={{
                  width: "450px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  rowGap: "20px",
               }}>
               <div className={styles.input1}>
                  <input
                     {...register("firstName")}
                     className={styles.firstName}
                     type="text"
                     name="firstName"
                     placeholder="First name"
                  />
               </div>
               <div className={styles.input1}>
                  <input
                     {...register("lastName")}
                     className={styles.lastName}
                     type="text"
                     name="lastName"
                     placeholder="Last name"
                  />
               </div>
               <div className={styles.input2}>
                  <input
                     {...register("email")}
                     className={styles.email}
                     onChange={onChange}
                     type="text"
                     name="email"
                     placeholder="E-mail"
                  />
               </div>
               <div className={styles.input2}>
                  <input
                     {...register("password")}
                     className={styles.password}
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={onChange}
                  />
               </div>
               <div className={styles.input2}>
                  <input
                     {...register("verifyPassword")}
                     className={
                        verifyChecked
                           ? styles.verifyPasswordChecked
                           : styles.verifyPasswordDefault
                     }
                     type="password"
                     placeholder="Verify Password"
                     onChange={onChange}
                  />
               </div>
               <div className={styles.btn}>
                  <input
                     type="submit"
                     value="Sign Up"
                     className={styles.signUp}
                  />
               </div>
            </form>
            <div
               style={{
                  width: "100%",
                  marginLeft: "8%",
                  marginTop: "60px",
                  height: "100px",
               }}>
               <div className={styles.account}>
                  <p>
                     You have an account?
                     <a href="/Login" style={{ color: "#7b80f2" }}>
                        {" "}
                        Sign in!
                     </a>
                  </p>
               </div>
               <div className={styles.Terms}>
                  <p>
                     {" "}
                     By click{" "}
                     <strong style={{ color: "#7b80f2" }}>Sign Up</strong>, You
                     are in agreement of{" "}
                     <a style={{ color: "#7b80f2" }} href="/Terms of use">
                        The Terms of use
                     </a>{" "}
                     and{" "}
                     <a style={{ color: "#7b80f2" }} href="/Privacy policy">
                        Privacy policy
                     </a>
                     .
                  </p>
               </div>
            </div>
         </div>
         <div className={styles.backGroundImg}></div>
      </div>
   );
}
export default SignUp;
