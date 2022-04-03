import { useState, useEffect } from "react";
import styles from "../Styles/Home.module.css";
import NaviBar from "../components/NaviBar.js";
import SearchBar from "../components/SearchBar";
import axios from "axios";

function Home() {
   const [loading, setLoading] = useState(true);

   const getMoives = async () => {
      const response = await axios.get(
         "https://api.themoviedb.org/3/trending/movie/week?api_key=83f61a3baf6174f8aeb8a593cc236386&/movie/508&page=1"
      );
      setLoading(false);
   };
   useEffect(() => {
      getMoives();
   }, []);
   return (
      <div className={styles.container}>
         {loading ? (
            <div className={styles.loader}>
               <span>loading...</span>
            </div>
         ) : (
            <div className={styles.bodyContainer}>
               <div
                  style={{
                     backgroundColor: "#161616",
                     height: "60px",
                     width: "100%",
                  }}>
                  <NaviBar />
               </div>
               <div className="searchBarContainer">
                  <SearchBar width="500px" />
               </div>
            </div>
         )}
      </div>
   );
}
export default Home;
