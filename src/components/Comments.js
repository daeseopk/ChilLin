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
   isOpen,
   setIsOpen,
   email_ref,
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
         <InputComment
            email_ref={email_ref}
            currentUser={currentUser}
            loading={loading}
            id={id}
            setToggle={setToggle}
            setIsOpen={setIsOpen}
         />
         <ShowComments
            email_ref={email_ref}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            id={id}
            currentUser={currentUser}
         />
      </div>
   );
}
