import React from "react";
import styles from "../Styles/Details.module.css";

export default function Right_Top({
   Title,
   status,
   language,
   revenue,
   budget,
}) {
   //  console.log(movie.movie);
   return (
      <div className={styles.RightTop}>
         <div className={styles.ItemWrapper}>
            <p className={styles.Title}> Title</p>
            <p className={styles.body}>{Title}</p>
         </div>
         <div className={styles.ItemWrapper}>
            <p className={styles.Title}>Status</p>
            <p className={styles.body}>{status}</p>
         </div>
         <div className={styles.ItemWrapper}>
            <p className={styles.Title}>Language</p>
            {language.map((language) => {
               return (
                  <span className={styles.language}>
                     {language.english_name}
                  </span>
               );
            })}
         </div>
         <div className={styles.ItemWrapper}>
            <p className={styles.Title}>Budget</p>
            <p className={styles.body}>
               ${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
         </div>
         <div className={styles.ItemWrapper}>
            <p className={styles.Title}>Revenue</p>
            <p className={styles.body}>
               ${revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
         </div>
      </div>
   );
}
