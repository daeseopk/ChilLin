import React from "react";
import styles from "../Styles/Detail.module.css";
import styled from "styled-components";
import Rating from "../components/Rating";

export default function Poster({
   backgroundImg,
   title,
   overview,
   release_date,
   genres,
   runtime,
   rating,
}) {
   var Runtime = [];
   if (runtime / 60 >= 0) {
      Runtime[0] = Math.round(runtime / 60);
      Runtime[1] = runtime - Runtime[0] * 60;
   } else Runtime[1] = runtime;

   const PosterContainer = styled.div`
      position: relative;
      margin: 0 auto;
      top: 169px;
      width: 68%;
      height: 68%;
      background-image: url(${backgroundImg});
      background-size: cover;
      border-radius: 13px;
   `;
   return (
      <PosterContainer>
         <div className={styles.bodyWrapper}>
            <div className={styles.menuWrapper}>
               <span className={styles.spanBtn}>ABOUT</span>
               <span className={styles.spanBtn}>VIDEOS</span>
               <span className={styles.spanBtn}>FEATURED</span>
               <span className={styles.spanBtn}>GALLERY</span>
               <h1 className={styles.title}>{title}</h1>
               <div className={styles.text}>
                  <span className={styles.year}>
                     {release_date.substr(0, 4) + " |"}
                  </span>
                  {genres.map((genre, index) => {
                     if (index === 0) {
                        return <span>{genre.name}</span>;
                     } else return <span>/ {genre.name}</span>;
                  })}
                  <span>{`| ${Runtime[0]}h ${Runtime[1]}m`}</span>
                  <span
                     style={{
                        fontSize: "15px",
                        cursor: "pointer",
                        color: "white",
                     }}>
                     ♡
                  </span>
               </div>
               <Rating rating={rating} marginBottom={"0px"} margin={"0px"} />
               <p className={styles.overview}>{overview}</p>
               <p className={styles.viewmore}>VIEW MORE</p>
            </div>
         </div>
      </PosterContainer>
   );
}
