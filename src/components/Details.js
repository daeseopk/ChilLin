import React from "react";
import styles from "../Styles/Details.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Scroller from "../components/Scroller";
import Trailer from "../components/Trailer";
import RightTop from "../components/Right_Top";

export default function Details({
   Toggle,
   id,
   visibility,
   setVisibility,
   movie,
}) {
   const [people, setPeople] = useState();
   const [loading, setLoading] = useState(true);
   const [ScrollerXOffset, setScrollerXOffset] = useState(0);

   useEffect(() => {
      if (Toggle === "DETAILS") {
         setVisibility(1);
      } else setVisibility(0);
   }, [Toggle]);

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
   console.log(movie);
   return (
      <div
         style={{ opacity: visibility, zIndex: visibility }}
         className={styles.DetailContainer}>
         {loading ? null : (
            <div className={styles.DetailGridTemplate}>
               <div className={styles.DetailLeft}>
                  <Scroller
                     ScrollerXOffset={ScrollerXOffset}
                     setScrollerXOffset={setScrollerXOffset}
                     people={people}
                  />
                  <Trailer id={id} play_trigger={visibility} />
               </div>
               <div className={styles.DetailRight}>
                  <RightTop
                     Title={movie.original_title}
                     status={movie.status}
                     language={movie.spoken_languages}
                     budget={movie.budget}
                     revenue={movie.revenue}
                  />
               </div>
            </div>
         )}
      </div>
   );
}
