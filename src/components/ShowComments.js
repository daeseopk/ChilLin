import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Comments.module.css";
import Rating from "../components/Rating";
import SortBy from "../components/Sort";

export default function ShowComments({ id, currentUser }) {
   const [Comments, setComments] = useState();
   const [loading, setLoading] = useState(true);
   const [Sort, setSort] = useState();

   useEffect(() => {
      if (Sort === "Recent" || Sort === "Like") {
         var useSort_data = [];
         var Comments_sort = [];
         const getComments_sort = async () => {
            try {
               const result = await axios.get(
                  `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`
               );
               if (Sort === "Recent") {
                  result.data.map((comment, index) => {
                     useSort_data.push({
                        date: comment.useSort_date,
                        index: index,
                     });
                  });
                  useSort_data.sort(
                     (a, b) => new Date(b.date) - new Date(a.date)
                  );
               } else if (Sort === "Like") {
                  result.data.map((comment, index) => {
                     useSort_data.push({
                        like_count: comment.like_user.length,
                        index: index,
                     });
                  });
                  useSort_data.sort((a, b) => b.like_count - a.like_count);
               }
               useSort_data.map((data) => {
                  result.data.map((result_data, index) => {
                     if (data.index === index) {
                        Comments_sort.push(result_data);
                     }
                  });
               });
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
      //TODO : 원본 데이터 사용하는 것 수정, 댓글 모두 삭제 시 에러 수정
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
      var Comments_ = { ...Comments };
      var id_ = e.target.id;
      if (!Comments_[id_].like_user.includes(currentUser.uid)) {
         Comments_[id_].like_user.push(currentUser.uid);
         await axios.put(
            `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`,
            Comments_
         );
      } else {
         Comments_[id_].like_user = Comments_[id_].like_user.filter(
            (data) => data !== currentUser.uid
         );
         await axios.put(
            `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`,
            Comments_
         );
      }
   };
   return (
      <>
         {!loading && Comments ? (
            <div className={styles.ShowCommentsContainer}>
               <div className={styles.SortBy}>
                  <SortBy Sort={Sort} setSort={setSort} />
               </div>
               <ul className={styles.CommentsUl}>
                  {Comments.map((comment, index) => {
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
                                          onClick={onClick_Like}
                                          className={styles.LikeBtnWrapper}>
                                          <img
                                             id={index}
                                             className={styles.LikeBtn}
                                             src={
                                                comment.like_user.includes(
                                                   currentUser.uid
                                                )
                                                   ? require("../Images/LikeBtn_Like.png")
                                                   : require("../Images/LikeBtn_default.png")
                                             }
                                             alt="LikeBtn"
                                          />
                                          <span
                                             id={index}
                                             className={styles.LikeBtn_default}>
                                             {comment.like_user.length - 1}
                                          </span>
                                       </div>
                                    ) : null}
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
                  })}
               </ul>
            </div>
         ) : null}
      </>
   );
}
