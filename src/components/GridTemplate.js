import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Search.css";
import styles from "../Styles/Dots.module.css";
import Rating from "./Rating";

function GridTemplate({ movies }) {
   const [page, setPage] = useState(1);
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";

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
                       } else posterPath = require("../Images/NotExistImg.png");
                       return (
                          <div className="posterWrapper" key={movie.id}>
                             <Link
                                style={{ display: "contents" }}
                                to={`/Detail/id=${movie.id}`}>
                                <img
                                   src={posterPath}
                                   alt={movie.title}
                                   className="movies"
                                />
                             </Link>
                             <Rating
                                rating={movie.vote_average}
                                title={movie.title}
                                margin={"0 auto"}
                                marginBottom={"40px"}
                             />
                          </div>
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
                       } else posterPath = require("../Images/NotExistImg.png");
                       return (
                          <div key={movie.id}>
                             <Link
                                style={{ display: "contents" }}
                                to={`/Detail/:${movie.id}`}>
                                <img
                                   style={{ margin: "0px" }}
                                   src={posterPath}
                                   alt={movie.title}
                                   className="movies"
                                />
                             </Link>
                             <Rating
                                rating={movie.vote_average}
                                title={movie.title}
                             />
                          </div>
                       );
                    } else {
                       return false;
                    }
                 })}
         </div>
         <div className={styles.dotsWrapper}>
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
