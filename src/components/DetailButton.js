import React from "react";
import Styles from "../Styles/DetailButton.module.css";

export default function DetailButton({ moveTrigger }) {
   return (
      <div
         className={
            moveTrigger ? Styles.ButtonContainerMoved : Styles.ButtonContainer
         }>
         <div className={Styles.ButtonWrapper}>
            <span className={Styles.Button} id={Styles.Details}>
               DETAILS
            </span>
            <span className={Styles.Button} id={Styles.Comments}>
               COMMENTS
            </span>
         </div>
      </div>
   );
}
