import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../Styles/Comments.module.css";
import Rating from "../components/Rating";
import SortBy from "../components/Sort";
import ShowLike from "../components/ShowLike";

export default function ShowComments({
   id,
   currentUser,
   isOpen,
   setIsOpen,
   email_ref,
}) {
   const [Comments, setComments] = useState();
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [Sort, setSort] = useState();
   const Showlike = useRef([]);

   useEffect(() => {
      if (Sort === "Recent" || Sort === "Like" || Sort === "Rating") {
         var useSort_data = [];
         var Comments_sort = [];
         const getComments_sort = async () => {
            try {
               const result = await axios.get(
                  `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`
               );
               if (Sort === "Recent") {
                  result.data.map((comment, index) =>
                     useSort_data.push({
                        date: comment.useSort_date,
                        index: index,
                     })
                  );
                  useSort_data.sort(
                     (a, b) => new Date(b.date) - new Date(a.date)
                  );
               } else if (Sort === "Like") {
                  result.data.map((comment, index) =>
                     useSort_data.push({
                        like_count: Object.keys(comment.like_user).length - 1,
                        index: index,
                     })
                  );
                  useSort_data.sort((a, b) => b.like_count - a.like_count);
               } else if (Sort === "Rating") {
                  result.data.map((comment, index) =>
                     useSort_data.push({
                        rating: comment.rating,
                        index: index,
                     })
                  );
                  useSort_data.sort((a, b) => b.rating - a.rating);
               }
               useSort_data.map((data) =>
                  result.data.map((result_data, index) =>
                     data.index === index
                        ? Comments_sort.push(result_data)
                        : null
                  )
               );
               setComments(Comments_sort);
            } catch (error) {
               console.log(error);
            }
         };
         getComments_sort();
      } else {
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
      }
   }, [Sort, Comments]);

   const onClick_trash = async (e) => {
      //TODO : ?????? ????????? ???????????? ??? ??????, ?????? ?????? ?????? ??? ?????? ??????
      if (window.confirm("Are you sure delete this comment?")) {
         var length = Comments.length;
         for (let i = parseInt(e.target.id); i < length; i++) {
            Comments[i] = Comments[i + 1];
         }
         var Comments_ = Comments.filter(
            (Comments_) => Comments_ !== undefined
         );
         axios.put(
            `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`,
            Comments_
         );
      }
   };

   const onClick_Like = async (e) => {
      if (currentUser) {
         var Comments_ = { ...Comments };
         var id_ = e.target.id;
         var user_object = {};
         user_object[`${currentUser.uid}`] = currentUser;
         if (!Comments_[id_].like_user.hasOwnProperty(currentUser.uid)) {
            Comments_[id_].like_user = Object.assign(
               Comments_[id_].like_user,
               user_object
            );
            await axios.put(
               `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`,
               Comments_
            );
         } else {
            delete Comments_[id_].like_user[currentUser.uid];
            await axios.put(
               `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`,
               Comments_
            );
         }
      } else {
         setIsOpen(true);
         email_ref.current[0].focus();
      }
   };
   const onClick_dots = (e) => {
      setPage(parseInt(e.target.id));
      window.scrollTo(0, 900);
   };

   const makePage = (length) => {
      const dot = [];
      for (let i = 1; i < length + 2; i++) {
         dot.push(
            <span
               onClick={onClick_dots}
               className={
                  page === i ? styles.dots_selected : styles.dots_unselected
               }
               id={i}>
               ???
            </span>
         );
      }
      return dot;
   };
   const like_onMouseEnter = (e) => {
      Showlike.current[e.target.id].style = "opacity:1; z-index:1;";
   };

   return (
      <>
         {!loading && Comments ? (
            <div
               style={{ opacity: isOpen ? 0.2 : 1 }}
               className={styles.ShowCommentsContainer}>
               <div className={styles.SortBy}>
                  <SortBy Sort={Sort} setSort={setSort} />
               </div>
               <ul className={styles.CommentsUl}>
                  {Comments.map((comment, index) => {
                     if ((page - 1) * 4 <= index && page * 4 >= index) {
                        return (
                           <li className={styles.CommentsLi}>
                              <div className={styles.CommentWrapper}>
                                 <img
                                    className={styles.commentProfile}
                                    src={
                                       comment.user.photoURL
                                          ? comment.user.photoURL
                                          : require("../Images/defaultProfile.png")
                                    }
                                    alt="profile"
                                 />
                                 <div>
                                    <p className={styles.name}>
                                       {comment.user.displayName == null
                                          ? comment.user.email
                                          : comment.user.displayName}
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
                                    <div className={styles.LikeWrapper}>
                                       <span className={styles.LikeText}>
                                          Was this commnet useful to you?
                                       </span>
                                       {currentUser ? (
                                          <div
                                             className={styles.LikeBtnWrapper}>
                                             <img
                                                onClick={onClick_Like}
                                                id={index}
                                                className={styles.LikeBtn}
                                                src={
                                                   comment.like_user.hasOwnProperty(
                                                      `${currentUser.uid}`
                                                   )
                                                      ? require("../Images/LikeBtn_Like.png")
                                                      : require("../Images/LikeBtn_default.png")
                                                }
                                                alt="LikeBtn"
                                             />
                                             <span
                                                onMouseEnter={like_onMouseEnter}
                                                id={index}
                                                className={styles.LikeCount}>
                                                {Object.keys(comment.like_user)
                                                   .length - 1}
                                             </span>
                                             {currentUser.uid ===
                                             comment.user.uid ? (
                                                <ShowLike
                                                   Showlike={Showlike}
                                                   index={index}
                                                   comment_user={
                                                      comment.like_user
                                                   }
                                                />
                                             ) : null}
                                          </div>
                                       ) : (
                                          <div
                                             className={styles.LikeBtnWrapper}>
                                             <img
                                                onClick={onClick_Like}
                                                className={styles.LikeBtn}
                                                src={require("../Images/LikeBtn_default.png")}
                                                alt="LikeBtn"
                                             />
                                             <span
                                                id={index}
                                                className={styles.LikeCount}>
                                                {Object.keys(comment.like_user)
                                                   .length - 1}
                                             </span>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                                 <p className={styles.time}>{comment.date}</p>
                                 {currentUser ? (
                                    currentUser.uid === comment.user.uid ? (
                                       <img
                                          onClick={onClick_trash}
                                          className={styles.trash}
                                          src={require("../Images/trashcan.png")}
                                          id={index}
                                          alt="trash"
                                       />
                                    ) : null
                                 ) : null}
                              </div>
                           </li>
                        );
                     } else return null;
                  })}
               </ul>
               <div
                  style={{ opacity: Comments.length >= 6 ? "1" : "0" }}
                  className={styles.dotsWrapper}>
                  {parseInt(Comments.length / 5) || Comments.length % 5 >= 1
                     ? makePage(parseInt(Comments.length / 5))
                     : null}
               </div>
            </div>
         ) : null}
      </>
   );
}
