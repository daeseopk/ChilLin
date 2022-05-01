import { React, useEffect, useState } from "react";
import styles from "../Styles/Comments.module.css";
import InputComment from "./InputComment";
import firebase from "../firebase";
import ShowComments from "./ShowComments";

export default function Comments({
   Toggle,
   visibility,
   setVisibility,
   id,
   setToggle,
}) {
   const [loading, setLoading] = useState(true);
   const [currentUser, setCurrentUser] = useState();

   useEffect(() => {
      if (Toggle === "COMMENTS") {
         setVisibility(1);
      } else setVisibility(0);
   }, [Toggle]);

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
            opacity: visibility,
            zIndex: visibility,
         }}>
         {currentUser ? (
            <InputComment
               currentUser={currentUser}
               loading={loading}
               id={id}
               setToggle={setToggle}
            />
         ) : null}

         <ShowComments id={id} currentUser={currentUser} />
      </div>
   );
}
