import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Button from "@mui/material/Button";
import "../Styles/NaviBar.css";

function NaviBar() {
   const onClick = () => {
      window.sessionStorage.setItem("Login", false);
      window.location.replace("/Home");
   };
   return (
      <div className="navbar">
         {/* TODO : 메뉴바 */}
         <div>
            <Link to="/">
               <FaIcons.FaBars className="menuicon" />
            </Link>
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
         <div className="ItemContainer">
            <div
               style={{
                  position: "absolute",
                  right: "130px",
               }}></div>
            <Link to="/SignIn" className="naviBtn" style={{ right: "40px" }}>
               <Button style={{ fontSize: "15px" }} color="inherit">
                  Sign In
               </Button>
            </Link>
            <button
               onClick={onClick}
               style={{ position: "absolute", right: "150px", top: "20px" }}>
               logout
            </button>
         </div>
      </div>
   );
}
export default NaviBar;
