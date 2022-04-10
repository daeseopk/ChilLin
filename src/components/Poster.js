import React from "react";
import styles from "../Styles/Detail.module.css";
import styled from "styled-components";
import Rating from "../components/Rating";

export default function Poster({
   poster,
   title,
   overview,
   release_date,
   genres,
   runtime,
   rating,
}) {
   var Runtime = [];
   if (runtime / 60 >= 0) {
      Runtime[0] = Math.floor(runtime / 60);
      Runtime[1] = runtime - Runtime[0] * 60;
   } else Runtime[1] = runtime;

   const PosterContainer = styled.div`
      display: flex;
      position: relative;
      margin: 0 auto;
      top: 169px;
      width: 68%;
      height: 68%;
   `;
   return (
      <PosterContainer>
         <div className={styles.posterWrapper}>
            <img className={styles.poster} src={poster} alt="poster" />
         </div>
         <div className={styles.bodyWrapper}>
            <div className={styles.header}>
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
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "white",
                     }}>
                     ♡
                  </span>
               </div>
               <Rating rating={rating} marginBottom={"0px"} margin={"0px"} />
            </div>
            <p className={styles.overview}>{overview}</p>
         </div>
      </PosterContainer>
   );
}
