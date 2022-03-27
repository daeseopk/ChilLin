import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function carousel({ recommend, IMAGE_URL }) {
   const StyledSlider = styled(Slider)`
      .slick-list {
         width: 100%;
         margin: 0 auto;
      }
      .slick-dots {
         .slick-active {
            button::before {
               color: #c1c1c1;
            }
         }
         button::before {
            color: #e9e9e9;
         }
      }
      .slick-slide {
      }
   `;
   const Image = styled.img`
      margin: 0 auto;
      width: 85%;
      height: 85%;
      border-radius: 5px;
      transition: all 0.3s ease;
      &:hover {
         width: 95%;
         height: 95%;
      }
   `;
   const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 5500,
   };
   return (
      <div>
         <p
            style={{
               marginTop: "200px",
               marginLeft: "1.5%",
               marginBottom: "10px",
               textAlign: "left",
               fontSize: "20px",
               color: "white",
            }}>
            Recommends
         </p>
         <StyledSlider {...settings}>
            {recommend.map((rec) => (
               <div key={rec.id}>
                  <Link
                     style={{
                        display: "contents",
                     }}
                     to={`/Detail:${rec.id}`}>
                     <Image src={IMAGE_URL + rec.backdrop_path} />
                     <p style={{ color: "white", fontSize: "13px" }}>
                        {rec.title}
                     </p>
                  </Link>
               </div>
            ))}

            {/* {movies.map((movie) => (
               <div key={movie.id}>
                  <a href={movie.url} target="_blank" rel="noreferrer">
                     <Image src={movie.medium_cover_image} />
                  </a>
               </div>
            ))} */}
         </StyledSlider>
      </div>
   );
}
