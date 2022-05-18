import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../Styles/Slider_home.module.css";
import styled from "styled-components";

export default function Slider_home() {
   const [movie, setMovie] = useState();
   const [loading, setLoading] = useState();
   const [genre, setGenre] = useState();
   const [sequence, setSequence] = useState([0, 1, 2, 3, 4]);
   const [transform, setTranform] = useState([
      "-10%,30%",
      "5%,10%",
      "20%,0",
      "35%,10%",
      "50%,30%",
   ]);
   const summary = useRef([]);
   const card = useRef([]);
   useEffect(() => {
      const getMovie = async () => {
         var sequence_ = [];
         var movie_ = [];
         try {
            const result = await axios.get(
               `https://api.themoviedb.org/3/movie/now_playing?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US&page=1`
            );
            const genre_ = await axios.get(
               "https://api.themoviedb.org/3/genre/movie/list?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US"
            );
            for (let i = 0; i < 5; i++) {
               sequence_.push(i);
               movie_.push(result.data.results[i]);
            }
            setSequence(sequence_);
            setGenre(genre_.data.genres);
            setMovie(movie_);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovie();
   }, []);
   useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);
   const handleResize = () => {
      if (window.innerWidth > 1400) {
         setTranform(["-10%,30%", "5%,10%", "20%,0", "35%,10%", "50%,30%"]);
      } else if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
         setTranform(["0%,30%", "10%,10%", "20%,0", "30%,10%", "40%,30%"]);
      } else if (window.innerWidth <= 1000) {
         setTranform(["10%,30%", "15%,10%", "20%,0", "25%,10%", "30%,30%"]);
      }
   };

   const onClick = (e) => {
      var sequence_ = Array.from(sequence);
      if (e.target.id === "left") {
         for (let i = 0; i < sequence_.length; i++) {
            if (sequence_[i] === 4) sequence_[i] = -1;
            sequence_[i] = sequence_[i] + 1;
         }
      } else {
         for (let i = 0; i < sequence_.length; i++) {
            if (sequence_[i] === 0) sequence_[i] = sequence_.length;
            sequence_[i] = sequence_[i] - 1;
         }
      }
      setSequence(sequence_);
   };
   const onMouseEnter = (e) => {
      if (sequence[e.target.id] === 2) {
         summary.current[e.target.id].style =
            "opacity:1; background-color:rgba(0,0,0,0.5);";
      }
   };
   const onMouseOut = (e) => {
      if (sequence[e.target.id] === 2) {
         summary.current[e.target.id].style = "opacity:0;";
      }
   };
   const onClick_Card = (seq, e) => {
      var sequence_ = Array.from(sequence);
      if (seq < 2) {
         for (let j = 0; j < 2 - seq; j++) {
            for (let i = 0; i < sequence_.length; i++) {
               if (sequence_[i] === 4) sequence_[i] = -1;
               sequence_[i] = sequence_[i] + 1;
            }
            setSequence(sequence_);
         }
      } else {
         for (let j = 0; j < seq - 2; j++) {
            for (let i = 0; i < sequence_.length; i++) {
               if (sequence_[i] === 0) sequence_[i] = sequence_.length;
               sequence_[i] = sequence_[i] - 1;
            }
            setSequence(sequence_);
         }
      }
   };
   const onClick_viewmore = (index, movie, e) => {
      summary.current[index].style = "opacity:0;";
      card.current[index].style =
         "transition: 1.5s all ease; width:100vw; height:100vh; transform:translate(-14.5%,-16.5%);";
      setTimeout(function () {
         window.location.replace(`/Detail/id=${movie.id}`);
      }, 1600);
   };
   return (
      <>
         {!loading ? (
            <div className={styles.Slider_Container}>
               <div className={styles.Slider_poster_Container}>
                  {movie
                     ? movie.map((movie, index) => {
                          return (
                             <Card
                                ref={(elem) => (card.current[index] = elem)}
                                seq={sequence[index]}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseOut}
                                filter={
                                   sequence[index] === 2
                                      ? null
                                      : "filter: blur(8px);"
                                }
                                webkit_filter={
                                   sequence[index] === 2
                                      ? null
                                      : "-webkit-filter: blur(5px);"
                                }
                                z_index={
                                   sequence[index] === 2
                                      ? "3"
                                      : sequence[index] === 1 ||
                                        sequence[index] === 3
                                      ? "2"
                                      : "1"
                                }
                                height={
                                   sequence[index] === 2
                                      ? "100%"
                                      : sequence[index] === 1 ||
                                        sequence[index] === 3
                                      ? "80%"
                                      : "60%"
                                }
                                backgroundImg={movie.backdrop_path}
                                transform={transform[sequence[index]]}>
                                <div
                                   onClick={(e) => {
                                      onClick_Card(sequence[index], e);
                                   }}
                                   id={index}
                                   ref={(elem) =>
                                      (summary.current[index] = elem)
                                   }
                                   className={styles.Summary_Container}>
                                   <div
                                      id={index}
                                      className={styles.Summary_Wrapper}>
                                      <p
                                         id={index}
                                         className={styles.Summary_Title}>
                                         {movie.title}
                                      </p>
                                      <div
                                         className={
                                            styles.Summary_genre_Wrapper
                                         }>
                                         {genre.map((genre) =>
                                            movie.genre_ids.map((genre_) => {
                                               if (genre.id === genre_)
                                                  return (
                                                     <span
                                                        seq={sequence[index]}
                                                        className={
                                                           styles.Summary_genre
                                                        }>
                                                        {genre.name}
                                                     </span>
                                                  );
                                            })
                                         )}
                                      </div>
                                      <p className={styles.Summary_overview}>
                                         {movie.overview}
                                      </p>
                                      {/* view more 기능만 구현하였음 */}
                                      <span
                                         onClick={(e) => {
                                            onClick_viewmore(index, movie, e);
                                         }}
                                         style={{ cursor: "pointer" }}
                                         className={styles.Summary_viewmore}>
                                         view more
                                      </span>
                                   </div>
                                </div>
                             </Card>
                          );
                       })
                     : null}
                  <img
                     className={styles.leftArrow}
                     src={require("../Images/arrow.png")}
                     alt="leftbtn"
                     id="left"
                     onClick={onClick}></img>
                  <img
                     className={styles.rightArrow}
                     src={require("../Images/arrow.png")}
                     alt="rightbtn"
                     id="right"
                     onClick={onClick}></img>
               </div>
            </div>
         ) : null}
      </>
   );
}
const Card = styled.div`
   position: absolute;
   margin: 0 auto;
   width: 70%;
   height: ${(prop) => prop.height};
   transform: translate(${(prop) => prop.transform});
   background-image: url("https://image.tmdb.org/t/p/original${(prop) =>
      prop.backgroundImg}");
   background-size: cover;
   ${(prop) => prop.filter}
   ${(prop) => prop.webkit_filter}
   z-index: ${(prop) => prop.z_index};
   transition: 0.6s ease all;
`;
