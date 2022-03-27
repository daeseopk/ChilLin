import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

// TODO Detail 페이지 구현하기
function Detail() {
   const [movie, setMovie] = useState();
   const [loading, setLoading] = useState(true);
   const { id } = useParams();

   const getMovie = async () => {
      const response = await fetch(
         `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      );
      const json = await response.json();
      setMovie(json.data.movie);
      setLoading(false);
   };
   useEffect(() => {
      getMovie();
   }, []);

   return (
      <div>{loading ? <h1>loading...</h1> : <MovieDetail movie={movie} />}</div>
   );
}
export default Detail;
