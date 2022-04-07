import "../Styles/SideMenu.css";

function SideMenu({ menuVisible, setMenuVisible }) {
   const onClick = () => {
      setMenuVisible(false);
   };

   return (
      <div className={menuVisible ? "sidemenu active" : "sidemenu"}>
         <div className="top">
            <div className="profile">
               <span
                  style={{
                     cursor: "pointer",
                     fontSize: "30px",
                     color: "white",
                  }}>
                  (profile)
               </span>
            </div>
            <div className="back">
               <span
                  onClick={onClick}
                  style={{ fontSize: "40px", color: "white" }}>
                  ⏎
               </span>
            </div>
         </div>
         <div>
            <ul style={{ color: "White" }}>
               <li>푸하하학</li>
               <li>파하하학</li>
               <li>뇨호호홋</li>
               <li>푸슈슈슉</li>
            </ul>
         </div>
      </div>
   );
}

export default SideMenu;
