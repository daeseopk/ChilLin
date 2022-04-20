import React from "react";
import styles from "../Styles/ScrollerButton.module.css";

export default function ScrollerButton({
   onclick_ScollerButton,
   ScrollerXOffset,
   Scroller_MaxXOffset,
   position,
}) {
   return (
      <div onClick={onclick_ScollerButton} className={styles.buttonWrapper}>
         {position === "prev" ? (
            <img
               className={
                  ScrollerXOffset == 0
                     ? styles.button_leftHidden
                     : styles.button_left
               }
               src={require("../Images/arrow.png")}
               alt="arrow_left"
            />
         ) : (
            <img
               className={
                  ScrollerXOffset == Scroller_MaxXOffset - 920
                     ? styles.button_rightHidden
                     : styles.button_right
               }
               src={require("../Images/arrow.png")}
               alt="arrow_right"
            />
         )}
      </div>
   );
}
