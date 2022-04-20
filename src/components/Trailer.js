import React from "react";
import styles from "../Styles/Details.module.css";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

export default function Trailer({ play_trigger, id }) {
   const [loading, setLoading] = useState(true);
   const [userPause, setUserPause] = useState(false);
   const [playing, setPlaying] = useState(false);
   const [trailer, setTrailer] = useState();
   const Player = useRef();
   useEffect(() => {
      const getTrailer = async () => {
         try {
            const result = await axios.get(
               `https://api.themoviedb.org/3/movie/${id}/videos?api_key=83f61a3baf6174f8aeb8a593cc236386&language=en-US`
            );
            setTrailer(result.data.results);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getTrailer();
   }, []);

   useEffect(() => {
      if (
         window.pageYOffset >= 950 &&
         play_trigger === 1 &&
         userPause === false
      ) {
         setPlaying(true);
      } else if (play_trigger === 0) {
         setPlaying(false);
      }
   }, [window.pageYOffset]);
   const onPause = () => {
      setUserPause(true);
   };
   const onPlay = () => {
      setPlaying(true);
   };

   return (
      <div className={styles.TrailerContainer}>
         {loading ? null : (
            <div className={styles.PlayerWrapper}>
               {trailer.length >= 1 ? (
                  <>
                     <p className={styles.trailerTitle}>Trailer</p>
                     <ReactPlayer
                        ref={Player}
                        width="inherit"
                        playing={playing}
                        height="inherit"
                        onPlay={onPlay}
                        onPause={onPause}
                        muted
                        url={
                           "https://www.youtube.com/watch?v=" + trailer[0].key
                        }
                        controls
                     />
                  </>
               ) : null}
            </div>
         )}
      </div>
   );
}
