import { React, useEffect } from "react";
import styles from "../Styles/Comments.module.css";
import InputComment from "./InputComment";

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
         className={styles.CommentsContainer}
         style={{
            opacity: opacity_comments,
         }}>
         <InputComment />
      </div>
   );
}
