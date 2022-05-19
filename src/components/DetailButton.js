import React from "react";
import Styles from "../Styles/DetailButton.module.css";

export default function DetailButton({ Toggle, setToggle, moveTrigger }) {
   const onClick = (e) => {
      console.log(e.target.value);
      if (e.target.id === "DetailButton_Details__YO6eg") setToggle("DETAILS");
      else setToggle("COMMENTS");
   };
   return (
      <div
         className={
            moveTrigger ? Styles.ButtonContainerMoved : Styles.ButtonContainer
         }>
         <div className={Styles.ButtonWrapper}>
            <span
               onClick={onClick}
               className={
                  Toggle === "DETAILS" ? Styles.ButtonActive : Styles.Button
               }
               id={Styles.Details}>
               DETAILS
            </span>
            <span
               onClick={onClick}
               className={
                  Toggle === "COMMENTS" ? Styles.ButtonActive : Styles.Button
               }
               id={Styles.Comments}>
               COMMENTS
            </span>
         </div>
      </div>
   );
}
