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
            <p
               className={
                  ScrollerXOffset == 0 ? styles.prevHidden : styles.prev
               }>
               prev
            </p>
         ) : (
            <p
               className={
                  ScrollerXOffset == Scroller_MaxXOffset - 920
                     ? styles.nextHidden
                     : styles.next
               }>
               next
            </p>
         )}
      </div>
   );
}
