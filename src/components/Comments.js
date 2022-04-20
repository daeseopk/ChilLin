import { React, useEffect } from "react";

export default function Comments({
   visibility,
   opacity_comments,
   setOpacity_comments,
}) {
   useEffect(() => {
      if (visibility === "COMMENTS") {
         setOpacity_comments(1);
      } else setOpacity_comments(0);
   }, [visibility]);

   return (
      <div
         style={{
            opacity: opacity_comments,
            position: "absolute",
            border: "2px solid red",
            zIndex: "3",
            top: "50vh",
            transition: "all ease 0.6s",
         }}>
         <div
            styles={{
               border: "2px solid red",
               width: "200px",
               height: "200px",
               background: "none",
            }}>
            comments
         </div>
      </div>
   );
}
