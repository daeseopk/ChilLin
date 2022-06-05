import { useState, useEffect } from "react";
import styles from "../Styles/Home.module.css";
import NaviBar from "../components/NaviBar.js";
import axios from "axios";
import Loading from "../components/Loading";
import Slider_home from "../components/Slider_home";

function Home() {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setLoading(true);
   }, []);
   return (
      <div className={styles.container}>
         {loading && window.sessionStorage.getItem("isFirst") === null ? (
            <Loading setLoading={setLoading} />
         ) : (
            <div className={styles.bodyContainer}>
               <div className={styles.NavbarContainer}>
                  <NaviBar />
               </div>
               <div className={styles.bodyWrapper}>
                  <Slider_home />
               </div>
            </div>
         )}
      </div>
   );
}
export default Home;
