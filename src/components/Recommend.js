import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Recommend() {
   const [recommend, setRecommend] = useState({});
   const [loading, setLoading] = useState(true);
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
   useEffect(() => {
      const getMovies = async () => {
         try {
            const result = await axios.get(
               "https://api.themoviedb.org/3/movie/popular?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US&page=1"
            );
            setRecommend(result.data.results);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getMovies();
   }, []);
   return (
      <div>
         {loading ? null : (
            <Carousel recommend={recommend} IMAGE_URL={IMAGE_URL} />
         )}
      </div>
   );
}

export default Recommend;
