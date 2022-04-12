import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NaviBar from "../components/NaviBar";
import styles from "../Styles/Detail.module.css";
import styled from "styled-components";
import Poster from "../components/Poster";

// TODO Detail 페이지 구현하기
function Detail() {
   const [movie, setMovie] = useState();
   const [loading, setLoading] = useState(true);
   const [ScrollY, setScrollY] = useState();
   const [opacity, setOpacity] = useState();
   const { id } = useParams();
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
   const handleFollow = () => {
      setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
   };

   useEffect(() => {
      const getMovies = async () => {
         try {
            const result = await axios.get(
               `https://api.themoviedb.org/3/movie/${id}?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US`
            );
            // setMovie(result.data.);
            setMovie(result.data);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, []);
   useEffect(() => {
      setOpacity((0.4 + 0.001 * ScrollY).toFixed(2));
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
   const BackgroundImage = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
            to bottom,
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0.3),
            rgba(22, 22, 22, 0.5),
            rgba(22, 22, 22, 1)
         ),
         url(${backgroundImg});
      background-size: cover;
      z-index: 1;
      ::before {
         content: "";
         opacity: ${isNaN(opacity) ? 0.4 : opacity};
         position: absolute;
         top: 0px;
         left: 0px;
         right: 0px;
         bottom: 0px;
         background-color: #161616;
      }
   `;
   return (
      <div>
         {loading ? (
            <h1>loading...</h1>
         ) : (
            <div className={styles.Container}>
               <BackgroundImage></BackgroundImage>
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
            </div>
         )}
      </div>
   );
}
export default Detail;
