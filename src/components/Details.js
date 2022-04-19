import React from "react";
import styles from "../Styles/Details.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Scroller from "../components/Scroller";

export default function Details({
   visibility,
   id,
   opacity_details,
   setOpacity_details,
}) {
   const [people, setPeople] = useState();
   const [loading, setLoading] = useState(true);
   const [ScrollerXOffset, setScrollerXOffset] = useState(0);

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
            <Scroller
               ScrollerXOffset={ScrollerXOffset}
               setScrollerXOffset={setScrollerXOffset}
               people={people}
            />
         )}
      </div>
   );
}
