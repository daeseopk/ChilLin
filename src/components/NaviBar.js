import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Button from "@mui/material/Button";
import { auth } from "../firebase";
import "../Styles/NaviBar.css";
import SideMenu from "./SideMenu.js";
import { useState } from "react";
import styled from "styled-components";

function NaviBar() {
   const [menuVisible, setMenuVisible] = useState(false);
   const logout = async () => {
      await auth.signOut();
   };
   const onClick = () => {
      window.sessionStorage.setItem("Login", false);
      window.location.replace("/Home");
      logout();
   };
   const onMenuClick = () => {
      setMenuVisible(!menuVisible);
   };
   const Unknown = styled.img`
      position: absolute;
      justify-content: flex-end;
      right: 100px;
      top: 20px;
      height: 30px;
      width: 30px;
      background-color: white;
      border-radius: 50px;
   `;
   // const user = JSON.parse(
   //    window.sessionStorage.getItem(
   //       "firebase:authUser:AIzaSyAUFNVPsLXeaIapM-Vfv1OXQQ_tRpDjSks:[DEFAULT]"
   //    )
   // );
   const loginStatus = window.sessionStorage.getItem("Login");

   return (
      <div className="navbar">
         <SideMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
         <div onClick={onMenuClick}>
            <FaIcons.FaBars className="menuicon" />
         </div>
         <div
            style={{
               marginLeft: "3%",
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
            }}>{`Login Status : ${window.sessionStorage.getItem("Login")}`}</p>
         {loginStatus === "false" || loginStatus === null ? (
            <div className="ItemContainer">
               <Link to="/SignIn" className="naviBtn" style={{ right: "40px" }}>
                  <Button style={{ fontSize: "15px" }} color="inherit">
                     Sign In
                  </Button>
               </Link>
            </div>
         ) : (
            <div className="ItemContainer">
               <div>
                  <button
                     onClick={onClick}
                     style={{
                        position: "absolute",
                        justifyContent: "flex-end",
                        right: "200px",
                        top: "20px",
                     }}>
                     logout
                  </button>
                  <span
                     style={{
                        color: "white",
                        fontSize: "30px",
                        position: "absolute",
                        justifyContent: "flex-end",
                        right: "150px",
                        top: "20px",
                     }}>
                     ♡
                  </span>
                  <Unknown
                     src={require("../Images/unknown.png")}
                     alt="unknown"
                  />
                  <button
                     style={{
                        position: "absolute",
                        justifyContent: "flex-end",
                        color: "white",
                        backgroundColor: "#161616",
                        fontSize: "17px",
                        border: "none",
                        right: "30px",
                        top: "22px",
                     }}>
                     HELP
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
export default NaviBar;
