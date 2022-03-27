import React, { useState } from "react";
import { Link } from "react-router-dom";

function GridTemplate({ movies }) {
   const [page, setPage] = useState(1);
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";

   console.log(movies);
   return (
      <div className="movieExistBody">
         {page === 1
            ? movies.map((movie, index) => {
                 if (index >= 10) return false;
                 return (
                    <Link to={`/Detail/:${movie.id}`}>
                       <div
                          className="movies"
                          key={index}
                          style={{
                             backgroundImage: `url(${IMAGE_URL}${movie.poster_path})`,
                          }}></div>
                    </Link>
                 );
              })
            : movies.map((movie, index) => {
                 if (index < 10) return false;
                 return (
                    <Link to={`/Detail/:${movie.id}`}>
                       <div
                          className="movies"
                          key={index}
                          style={{
                             backgroundImage: `url(${IMAGE_URL}${movie.poster_path})`,
                          }}></div>
                    </Link>
                 );
              })}
      </div>
   );
}

export default GridTemplate;
