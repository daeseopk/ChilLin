import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import styles from "../Styles/Detail.module.css";
import Poster from "../components/Poster";
import DetailButton from "../components/DetailButton";
import BackgroundImage from "../components/BackgroundImage";

function Detail() {
   const [movie, setMovie] = useState();
   const [loading, setLoading] = useState(true);
   const [moveButtonTrigger, setMoveButtonTrigger] = useState(false);
   const [ScrollY, setScrollY] = useState();
   const [opacity, setOpacity] = useState();
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
      if (ScrollY >= 400) setMoveButtonTrigger(true);
      if (ScrollY < 500) setMoveButtonTrigger(false);
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
   if (movie) {
      var backgroundImg = IMAGE_URL + movie.backdrop_path;
   }

   return (
      <div>
         {loading ? (
            <h1>loading...</h1>
         ) : (
            <div className={styles.Container}>
               <BackgroundImage
                  backgroundImg={backgroundImg}
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
               <DetailButton moveTrigger={moveButtonTrigger} />
            </div>
         )}
      </div>
   );
}

export default Detail;
