import React from "react";
import styles from "../Styles/Comments.module.css";
import { useState, useEffect } from "react";

export default function ShowLike({ index, comment_user, Showlike }) {
   const [user, setUser] = useState();
   var user_keys = Object.keys(comment_user);
   useEffect(() => {
      setUser(comment_user);
   }, []);

   return (
      <div
         id={index}
         ref={(elem) => (Showlike.current[index] = elem)}
         className={styles.ShowLikeContainer}>
         {user_keys.map((user_keys) => {
            if (user_keys === "uid") return null;
            else {
               return (
                  <>
                     {user ? (
                        <div className={styles.ShowLikeWrapper}>
                           <img
                              className={styles.profile_like}
                              src={
                                 user[user_keys]
                                    ? user[user_keys].photoURL
                                    : require("../Images/defaultProfile.png")
                              }
                              alt="profile"
                           />
                           <span className={styles.name_like}>
                              {user[user_keys] ? user[user_keys].email : null}
                           </span>
                        </div>
                     ) : null}
                  </>
               );
            }
         })}
      </div>
   );
}
