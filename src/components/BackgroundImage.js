import React from "react";
import styled from "styled-components";

export default function BackgroundImage({ backgroundImg, opacity }) {
   const BackgroundImage = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
            to bottom,
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0),
            rgba(22, 22, 22, 0.4),
            rgba(22, 22, 22, 0.7),
            rgba(22, 22, 22, 1)
         ),
         url(${backgroundImg});
      background-size: cover;
      z-index: 1;
      ::before {
         content: "";
         opacity: ${isNaN(opacity) ? 0.4 : opacity};
         position: absolute;
         top: 0px;
         left: 0px;
         right: 0px;
         bottom: 0px;
         background-color: #161616;
      }
   `;
   return <BackgroundImage></BackgroundImage>;
}
