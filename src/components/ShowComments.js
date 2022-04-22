import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Comments.module.css";
import Rating from "../components/Rating";

export default function ShowComments({ id }) {
   const [Comments, setComments] = useState();
   const [loading, setLoading] = useState(true);
   const [dropdown, setDropdown] = useState("down");
   const [opacity, setOpacity] = useState(1);

   useEffect(() => {
      const getComments = async () => {
         try {
            const result = await axios.get(
               `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`
            );
            setComments(result.data);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      };
      getComments();
   }, [Comments]);
   //    console.log(Comments);
   const onClick = (e) => {
      console.log(e);
      if (e.target.alt === "down") {
         setOpacity(0);
         setDropdown("up");
      } else {
         setOpacity(1);
         setDropdown("down");
      }
   };
   return (
      <>
         {!loading && Comments ? (
            <div className={styles.ShowCommentsContainer}>
               <div style={{ opacity: 1 }} className={styles.Title_Show}>
                  MOST RECENT COMMENTS{" "}
                  <img
                     onClick={onClick}
                     className={
                        dropdown === "down"
                           ? styles.DropdownBtn_Down
                           : styles.DropdownBtn_Up
                     }
                     src={require("../Images/Dropdown.png")}
                     alt={dropdown}
                  />
               </div>
               <ul className={styles.CommentsUl} style={{ opacity: opacity }}>
                  {Comments.map((comment) => {
                     return (
                        <li className={styles.CommentsLi}>
                           <div className={styles.CommentWrapper}>
                              <img
                                 className={styles.commentProfile}
                                 src={comment.user.photoURL}
                                 alt="profile"
                              />
                              <div>
                                 <p className={styles.name}>
                                    {comment.user.displayName}
                                 </p>
                                 <Rating
                                    readOnly={true}
                                    rating={comment.rating}
                                    fontSize="20px"
                                 />
                                 <p className={styles.text}>
                                    {comment.comment}
                                 </p>
                                 <hr className={styles.commentLine} />
                                 <hr className={styles.commentLineLong} />
                              </div>
                              <p className={styles.time}>
                                 {comment.date.map((date, index) => {
                                    if (index === 0) return date;
                                    else if (3 > index && index >= 1)
                                       return `.${date}`;
                                    else if (index === 3) return ` / ${date}`;
                                    else return `:${date}`;
                                 })}
                              </p>
                           </div>
                        </li>
                     );
                  })}
               </ul>
            </div>
         ) : null}
      </>
   );
}
