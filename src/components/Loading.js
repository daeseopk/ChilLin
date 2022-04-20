import styles from "../Styles/Loading.module.css";
import { useEffect, useState } from "react";

export default function Loading({ setLoading }) {
   const [Class_Loading, setClass_Loading] = useState(styles.Loading);
   const [Class_Logo, setClass_Logo] = useState(styles.Logo);

   useEffect(() => {
      setTimeout(function () {
         setClass_Loading(styles.Loading_ing);
      }, 500);
      setTimeout(function () {
         setClass_Loading(styles.Loading_done);
         setClass_Logo(styles.Logo_loading);
      }, 2000);
      setTimeout(function () {
         setLoading(false);
         window.sessionStorage.setItem("isFirst", false);
      }, 4000);
   }, []);

   return (
      <div className={Class_Loading}>
         <img
            className={Class_Logo}
            src={require("../Images/Logo.png")}
            alt="loading"
         />
      </div>
   );
}
