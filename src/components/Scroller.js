import styles from "../Styles/Details.module.css";
import styled from "styled-components";
import ScrollerButton from "./ScrollerButton";
import { useState, useRef } from "react";

export default function Scroller({
   ScrollerXOffset,
   people,
   setScrollerXOffset,
}) {
   const IMAGE_URL = "https://image.tmdb.org/t/p/original";
   const ScrollRef = useRef();
   const [Scroller_maxWidth, setScroller_maxWith] = useState();
   const Card = styled.div`
      width: 120px;
      heitht: 100%;
      display: inline-block;
      margin-right: 40px;
      list-style: none;
   `;
   const setScrollerX = (e) => {
      setScrollerXOffset(ScrollRef.current.scrollLeft);
      setScroller_maxWith(ScrollRef.current.scrollWidth);
   };
   const onclick_ScollerButton = (e) => {
      if (e.target.alt === "arrow_left") {
         ScrollRef.current.scrollTo({
            left: ScrollRef.current.scrollLeft - 800,
            behavior: "smooth",
         });
      } else {
         ScrollRef.current.scrollTo({
            left: ScrollRef.current.scrollLeft + 800,
            behavior: "smooth",
         });
      }
   };

   return (
      <div className={styles.ScrollerContainer}>
         <ScrollerButton
            onclick_ScollerButton={onclick_ScollerButton}
            ScrollerXOffset={ScrollerXOffset}
            position={"prev"}
         />
         <div
            onScroll={setScrollerX}
            className={styles.ScrollerWrapper}
            ref={ScrollRef}
            id="Scroller">
            <p className={styles.ScrollerTitle}>Cast & Crew</p>
            <ul className={styles.Scroller}>
               {people.map((people, index) => {
                  return (
                     <Card key={index}>
                        <li className={styles.card} key={index}>
                           <img
                              className={styles.profile}
                              src={
                                 people.profile_path
                                    ? IMAGE_URL + people.profile_path
                                    : require("../Images/NotExistImg.png")
                              }
                              alt={people.name}
                           />
                           <p className={styles.name} id={styles.originName}>
                              {people.name}
                           </p>
                           <p className={styles.name} id={styles.character}>
                              {people.character}
                           </p>
                        </li>
                     </Card>
                  );
               })}
            </ul>
         </div>
         <ScrollerButton
            onclick_ScollerButton={onclick_ScollerButton}
            ScrollerXOffset={ScrollerXOffset}
            Scroller_MaxXOffset={Scroller_maxWidth}
            position={"next"}
         />
      </div>
   );
}
