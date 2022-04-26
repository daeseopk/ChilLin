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
      if (Sort === "Recent") {
         const getComments_sort = async () => {
            var useSort_date = [];
            var Comments_sort = [];
            try {
               const result = await axios.get(
                  `https://movieweb-2b841-default-rtdb.firebaseio.com/Comments/${id}.json`
               );
               result.data.map((comment, index) => {
                  useSort_date.push({
                     date: comment.useSort_date,
                     index: index,
                  });
               });
               useSort_date.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬
               useSort_date.map((data) => {
                  // 정렬된 데이터를 map으로 돌면서 원본 데이터와 동일한 index값을 가질 때(정렬한 데이터와 같은 comment일 때) Comments_sort에 push
                  result.data.map((result_data, index) => {
                     if (data.index === index) {
                        Comments_sort.push(result_data);
                     }
                  });
               });
               setComments(Comments_sort); //최신순으로 정렬 완료된 Comment들 세팅
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
         for (let i = parseInt(e.target.alt); i < length; i++) {
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
   return (
      <>
         {!loading && Comments && currentUser ? (
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
                              </div>
                              <p className={styles.time}>{comment.date}</p>
                              {currentUser.uid === comment.user.uid ? (
                                 <img
                                    onClick={onClick_trash}
                                    className={styles.trash}
                                    src={require("../Images/trashcan.png")}
                                    alt={index}
                                 />
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
