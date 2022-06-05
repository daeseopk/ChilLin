import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { auth } from "../firebase";
import "../Styles/NaviBar.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../firebase";
import SearchBar from "./SearchBar";

const Profile = styled.img`
   position: absolute;
   justify-content: flex-end;
   right: ${(prop) => prop.right};
   top: 20px;
   height: 30px;
   width: 30px;
   border-radius: 50px;
`;
function NaviBar() {
   const [ScrollY, setScrollY] = useState();
   const [currentUser, setCurrentUser] = useState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getUserInfo = async () => {
         await firebase.auth().onAuthStateChanged(function (user) {
            setCurrentUser(user);
         });
      };
      getUserInfo();
      setLoading(false);
   }, []);

   useEffect(() => {}, [ScrollY]);

   useEffect(() => {
      const watch = () => {
         window.addEventListener("scroll", handleFollow);
      };
      watch();
      return () => {
         window.removeEventListener("scroll", handleFollow);
      };
   }, []);
   const handleFollow = () => {
      setScrollY(window.pageYOffset);
   };
   const logout = async () => {
      await auth.signOut();
   };
   const onClick = () => {
      window.sessionStorage.setItem("Login", false);
      window.location.replace("/Home");
      logout();
   };

   const loginStatus = window.sessionStorage.getItem("Login");

   return (
      <div
         style={{
            textAlign: "left",
            top: ScrollY >= 1 ? "-70px" : "0px",
         }}
         className="NavBarContainer">
         {!loading ? (
            <div className="navbar">
               <div
                  style={{
                     marginLeft: "30px",
                     height: "90%",
                  }}>
                  <Link to="/Home">
                     <img
                        className="Logo"
                        src={require("../Images/Logo.png")}
                        alt="logo"
                     />
                  </Link>
               </div>
               <p
                  style={{
                     width: "100%",
                     color: "White",
                  }}>{`Login Status : ${window.sessionStorage.getItem(
                  "Login"
               )}`}</p>
               {loginStatus === "false" || loginStatus === null ? (
                  <div className="ItemContainer">
                     <div className="SearchBarWrapper">
                        <SearchBar width="180px" />
                     </div>
                     <div className="SigninWrapper">
                        <Link to="/SignIn" className="naviBtn">
                           <Button style={{ fontSize: "15px" }} color="inherit">
                              Sign In
                           </Button>
                        </Link>
                     </div>
                  </div>
               ) : (
                  <div className="ItemContainer">
                     <div>
                        <div className="SearchBarWrapper">
                           <SearchBar width="180px" />
                        </div>
                        <button
                           onClick={onClick}
                           style={{
                              position: "absolute",
                              justifyContent: "flex-end",
                              right: "130px",
                              top: "20px",
                           }}>
                           logout
                        </button>
                        <img
                           src={require("../Images/Heart.png")}
                           alt="Heart"
                           style={{
                              width: "25px",
                              height: "25px",
                              position: "absolute",
                              justifyContent: "flex-end",
                              fontSize: "17px",
                              right: "80px",
                              top: "22px",
                           }}
                        />
                        {currentUser ? (
                           <Profile
                              right="30px"
                              alt="profile"
                              src={
                                 currentUser.photoURL
                                    ? currentUser.photoURL
                                    : require("../Images/defaultProfile.png")
                              }
                           />
                        ) : null}
                     </div>
                  </div>
               )}
            </div>
         ) : null}
      </div>
   );
}
export default NaviBar;
