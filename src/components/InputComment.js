import React, { useEffect, useState } from "react";
import styles from "../Styles/Comments.module.css";
import Rating from "../components/Rating";

export default function InputComment() {
   const [currentUser, setCurrentUser] = useState();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const getUserInfo = async () => {
         await setCurrentUser(
            JSON.parse(
               window.sessionStorage.getItem(
                  "firebase:authUser:AIzaSyAUFNVPsLXeaIapM-Vfv1OXQQ_tRpDjSks:[DEFAULT]"
               )
            )
         );
      };
      setLoading(false);
      getUserInfo();
   }, []);

   console.log(currentUser);
   return (
      <div className={styles.InputCommentContainer}>
         {loading ? null : (
            <>
               <p className={styles.Title}>COMMENTS</p>
               <div className={styles.profile_input}>
                  <img
                     className={styles.profile}
                     src={currentUser.photoURL}
                     alt="profile"
                  />
                  <form className={styles.inputWrapper}>
                     <input
                        className={styles.input}
                        type="text"
                        placeholder="   Write your comment here."
                     />
                     <img
                        type="submit"
                        className={styles.submit}
                        src={require("../Images/submit.png")}
                        alt="submit"
                     />
                  </form>
                  <div className={styles.ratingWrapper}>
                     <Rating readOnly={false} fontSize="2rem" />
                  </div>
               </div>
               <hr className={styles.line} />
            </>
         )}
      </div>
   );
}
