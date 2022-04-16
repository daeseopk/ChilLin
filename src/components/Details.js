import React from "react";
import styles from "../Styles/Details.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Details({
   visibility,
   id,
   opacity_details,
   setOpacity_details,
}) {
   const [people, setPeople] = useState();
   const [loading, setLoading] = useState(true);
   const [opacity, setOpacity] = useState(0);
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";

   useEffect(() => {
      if (visibility === "DETAILS") {
         setOpacity_details(1);
      } else setOpacity_details(0);
   }, [visibility]);

   useEffect(() => {
      const getPeople = async () => {
         try {
            const result = await axios.get(
               `https://api.themoviedb.org/3/movie/${id}/credits?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US`
            );
            setPeople(result.data.cast);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getPeople();
   }, []);
   return (
      <div
         style={{ opacity: opacity_details }}
         className={styles.DetailContainer}>
         {loading ? null : (
            <div className={styles.ScrollerWrapper}>
               <p className={styles.ScrollerTitle}>Cast & Crew</p>
               <ul className={styles.Scroller}>
                  {people.map((people, index) => {
                     return (
                        <li className={styles.card} key={index}>
                           <img
                              style={{ width: "110px", height: "166px" }}
                              src={
                                 people.profile_path
                                    ? IMAGE_URL + people.profile_path
                                    : require("../Images/NotExistImg.png")
                              }
                              alt={people.name}
                           />
                        </li>
                     );
                  })}
               </ul>
            </div>
         )}
      </div>
   );
}
