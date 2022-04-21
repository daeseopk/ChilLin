import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import styles from "../Styles/Detail.module.css";
import Poster from "../components/Poster";
import DetailButton from "../components/DetailButton";
import BackgroundImage from "../components/BackgroundImage";
import Details from "../components/Details";
import Comments from "../components/Comments";

function Detail() {
   const [movie, setMovie] = useState();
   const [loading, setLoading] = useState(true);
   const [moveButtonTrigger, setMoveButtonTrigger] = useState(false);
   const [ScrollY, setScrollY] = useState();
   const [opacity, setOpacity] = useState();
   const [opacity_details, setOpacity_details] = useState(0);
   const [opacity_comments, setOpacity_comments] = useState(0);
   const [Toggle, setToggle] = useState(null);
   const { id } = useParams();
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
   const handleFollow = () => {
      setScrollY(window.pageYOffset);
   };
   useEffect(() => {
      const getMovies = async () => {
         try {
            const result = await axios.get(
               `https://api.themoviedb.org/3/movie/${id}?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US`
            );
            setMovie(result.data);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, []);
   var Sensitivity = 7; // 민감도 낮을 수록 opacity가 자주 변하지만 다른 애니메이션에 영향을 미침
   useEffect(() => {
      if (ScrollY % Sensitivity === 0) {
         setOpacity((0.4 + 0.001 * ScrollY).toFixed(2));
      }
      if (ScrollY >= 400) {
         setMoveButtonTrigger(true);
         if (Toggle === "DETAILS") {
            setOpacity_details(1);
         } else if (Toggle === "COMMENTS") {
            setOpacity_comments(1);
         }
      }
      if (ScrollY < 500) {
         setOpacity_details(0);
         setOpacity_comments(0);
         setMoveButtonTrigger(false);
      }
   }, [ScrollY]);

   useEffect(() => {
      const watch = () => {
         window.addEventListener("scroll", handleFollow);
      };
      watch();
      return () => {
         window.removeEventListener("scroll", handleFollow);
      };
   }, []);

   return (
      <div>
         {loading ? (
            <h1>loading...</h1>
         ) : (
            <div className={styles.Container}>
               <BackgroundImage
                  backgroundImg={IMAGE_URL + movie.backdrop_path}
                  opacity={opacity}
               />
               <NaviBar />
               <Poster
                  poster={IMAGE_URL + movie.poster_path}
                  poster_NoneExist={require("../Images/NotExistImg.png")}
                  title={movie.title}
                  overview={movie.overview}
                  release_date={movie.release_date}
                  genres={movie.genres}
                  runtime={movie.runtime}
                  rating={movie.vote_average}
               />
               <DetailButton
                  Toggle={Toggle}
                  setToggle={setToggle}
                  moveTrigger={moveButtonTrigger}
               />
               <div className={styles.Bottom}>
                  <Details
                     id={movie.id}
                     visibility={Toggle}
                     opacity_details={opacity_details}
                     setOpacity_details={setOpacity_details}
                  />
                  <Comments
                     visibility={Toggle}
                     opacity_comments={opacity_comments}
                     setOpacity_comments={setOpacity_comments}
                  />
               </div>
            </div>
         )}
      </div>
   );
}

export default Detail;
