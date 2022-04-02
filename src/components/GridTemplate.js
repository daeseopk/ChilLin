import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Search.css";
import styles from "../Styles/Dots.module.css";

function GridTemplate({ movies }) {
   const [page, setPage] = useState(1);
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
   const NoExistImg = "../Images/NotExistImg.jpg";

   const onClick = (e) => {
      if (e.target.id === "0") setPage(1);
      else setPage(2);
   };

   return (
      <div className="Gridcontainer">
         <div className="Grid">
            {page === 1
               ? movies.map((movie, index) => {
                    if (index < 10) {
                       var posterPath = "";
                       if (movie.poster_path) {
                          posterPath = IMAGE_URL + movie.poster_path;
                       } else posterPath = NoExistImg;
                       return (
                          <Link
                             style={{ display: "contents" }}
                             to={`/Detail/:${movie.id}`}>
                             <div
                                key={index}
                                className="movies"
                                style={{
                                   backgroundImage: `url(${posterPath})`,
                                }}></div>
                          </Link>
                       );
                    } else {
                       return false;
                    }
                 })
               : movies.map((movie, index) => {
                    if (index >= 10) {
                       var posterPath = "";
                       if (movie.poster_path) {
                          posterPath = IMAGE_URL + movie.poster_path;
                       } else posterPath = NoExistImg;
                       return (
                          <Link to={`/Detail/:${movie.id}`}>
                             <div
                                key={index}
                                className="movies"
                                style={{
                                   backgroundImage: `url(${posterPath})`,
                                }}></div>
                          </Link>
                       );
                    } else {
                       return false;
                    }
                 })}
         </div>
         <div className="dotsWrapper">
            <span
               onClick={onClick}
               id="0"
               className={
                  page === 1 ? styles.dots_selected : styles.dots_unselected
               }>
               ●
            </span>
            <span
               onClick={onClick}
               id="1"
               className={
                  page === 2 ? styles.dots_selected : styles.dots_unselected
               }>
               ●
            </span>
         </div>
      </div>
   );
}

export default GridTemplate;
