import { React, useEffect, useState } from "react";
import styles from "../Styles/Comments.module.css";
import InputComment from "./InputComment";
import firebase from "../firebase";
import ShowComments from "./ShowComments";

export default function Comments({
   visibility,
   opacity_comments,
   setOpacity_comments,
   id,
   setToggle,
}) {
   const [loading, setLoading] = useState(true);
   const [currentUser, setCurrentUser] = useState();

   useEffect(() => {
      if (visibility === "COMMENTS") {
         setOpacity_comments(1);
      } else setOpacity_comments(0);
   }, [visibility]);

   useEffect(() => {
      const getUserInfo = async () => {
         await firebase.auth().onAuthStateChanged(function (user) {
            setCurrentUser(user);
         });
      };
      getUserInfo();
      setLoading(false);
   }, []);

   return (
      <div
         className={styles.CommentsContainer}
         style={{
            opacity: opacity_comments,
         }}>
         <InputComment
            currentUser={currentUser}
            loading={loading}
            id={id}
            setToggle={setToggle}
         />
         <ShowComments id={id} />
      </div>
   );
}
