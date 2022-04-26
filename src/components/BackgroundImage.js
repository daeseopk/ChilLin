import React from "react";
import styled from "styled-components";

const Background = styled.div`
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
      url(${(prop) => prop.backgroundImg});
   background-size: cover;
   z-index: 1;
   ::before {
      content: "";
      opacity: ${(prop) => (prop.opacity_ ? (prop) => prop.opacity_ : 0.4)};
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: #161616;
   }
`;

export default function BackgroundImage({ backgroundImg, opacity }) {
   return (
      <Background backgroundImg={backgroundImg} opacity_={opacity}></Background>
   );
}
