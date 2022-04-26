import React, { useState } from "react";
import styles from "../Styles/Comments.module.css";
import Rating from "../components/Rating";
import axios from "axios";

export default function InputComment({ currentUser, loading, id }) {
   const [textarea, setTextarea] = useState();
   const [rating, setRating] = useState();

   const onChange = (e) => {
      setTextarea(e.target.value);
   };
   const onCheckEnter = (e) => {
      if (e.key === "Enter") {
         onSubmit();
      }
   };
   const onSubmit = async () => {
      var now = new Date();
      var date = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()} / ${now.getHours()}:${now.getMinutes()}`;
      var useSort_date = `${now.getFullYear()}.${
         now.getMonth() + 1
      }.${now.getDate()} / ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const Put = async () => {
         const alreadyComments = await axios.get(
            `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`
         );
         var comments = alreadyComments.data;
         var CommentId;
         if (comments === null) {
            CommentId = 0;
         } else CommentId = comments.length;
         await axios.put(
            `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}/${CommentId}.json`,
            {
               comment: textarea,
               rating: rating * 2,
               like_count: 0,
               unlike_count: 0,
               date: date,
               useSort_date: useSort_date,
               user: currentUser,
            }
         );
      };
      await Put();
      setTextarea("");
      setRating(0);
      alert("completed writing a comment!");
   };
   var now = new Date();

   return (
      <div className={styles.InputCommentContainer}>
         {!loading && currentUser ? (
            <>
               <p className={styles.Title_Input}>COMMENTS</p>
               <div className={styles.inputContainer}>
                  <img
                     className={styles.profile}
                     src={
                        currentUser.photoURL
                           ? currentUser.photoURL
                           : require("../Images/defaultProfile.png")
                     }
                     alt="profile"
                  />
                  <div className={styles.inputWrapper}>
                     <input
                        onKeyPress={onCheckEnter}
                        onChange={onChange}
                        value={textarea}
                        className={styles.input}
                        type="text"
                        placeholder="Write your comment here."
                     />
                     <img
                        onClick={onSubmit}
                        className={styles.submit}
                        src={require("../Images/submit.png")}
                        alt="submit"
                     />
                  </div>
                  <div className={styles.ratingWrapper}>
                     <Rating
                        readOnly={false}
                        rating={rating * 2}
                        fontSize="2rem"
                        setRating={setRating}
                     />
                  </div>
               </div>
               <hr className={styles.line} />
            </>
         ) : null}
      </div>
   );
}
