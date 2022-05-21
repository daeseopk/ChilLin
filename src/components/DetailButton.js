import React from "react";
import "../Styles/DetailButton.css";

export default function DetailButton({ Toggle, setToggle, moveTrigger }) {
   const onClick = (e) => {
      console.log(e.target.id);
      if (e.target.id === "Details") setToggle("DETAILS");
      else setToggle("COMMENTS");
   };
   return (
      <div
         className={
            moveTrigger ? "ButtonContainerMoved" : "ButtonContainer"
         }>
         <div className="ButtonWrapper">
            <span
               onClick={onClick}
               className={
                  Toggle === "DETAILS" ? "ButtonActive" : "Button"
               }
               id="Details">
               DETAILS
            </span>
            <span
               onClick={onClick}
               className={
                  Toggle === "COMMENTS" ? "ButtonActive" : "Button"
               }
               id="Comments">
               COMMENTS
            </span>
         </div>
      </div>
   );
}
