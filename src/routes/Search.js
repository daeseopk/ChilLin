import React from "react";
import { useEffect, useState } from "react";
import NaviBar from "../components/NaviBar";
import SearchBar from "../components/SearchBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "../Styles/Search.css";
import Recommend from "../components/Recommend";
import GridTemplate from "../components/GridTemplate";

function Search() {
   const [loading, setLoading] = useState(true);
   const [movies, setMovies] = useState([]);
   const key = window.sessionStorage.getItem("key");

   const getMoives = async () => {
      const response = await axios.get(
         `https://api.themoviedb.org/3/search/movie?api_key=83f61a3baf6174f8aeb8a593cc236386&query=${key}`
      );
      setMovies(response.data.results);
      setLoading(false);
   };
   useEffect(() => {
      getMoives();
   }, []);

   return (
      <div className="container">
         {loading ? (
            <div className="loading">
               <span>loading...</span>
            </div>
         ) : (
            <div className="bodyContainer">
               <div
                  style={{
                     backgroundColor: "#161616",
                     height: "60px",
                     width: "100%",
                  }}>
                  <NaviBar />
               </div>
               <div className="bodyWrapper">
                  <div
                     className={
                        movies.length
                           ? "searchBarContainer"
                           : "searchBarContainerNoExist"
                     }>
                     <SearchBar width="500px" value={key} />
                  </div>
                  {movies.length ? (
                     <GridTemplate movies={movies} />
                  ) : (
                     <div className="movieNoneExistBody">
                        <h1 className="sorryText">
                           We couldn't find a match for "{key}".
                           <br />
                           Please try another search.
                        </h1>
                        <Recommend />
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}
export default Search;
