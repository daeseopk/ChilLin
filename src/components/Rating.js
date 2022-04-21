import * as React from "react";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

export default function BasicRating({
   rating,
   title,
   marginBottom,
   margin,
   readOnly,
   fontSize,
}) {
   const StyledRating = styled(Rating)`
      .MuiRating-decimal {
         font-size: ${fontSize};
         color: white;
      }
      .MuiRating-iconEmpty {
         color: grey;
      }
   `;
   rating = rating / 2;
   return (
      <Stack spacing={1}>
         <Typography component="legend">{title}</Typography>
         <StyledRating
            style={{
               margin: margin,
               marginBottom: marginBottom,
            }}
            name="ratings"
            defaultValue={rating}
            precision={0.5}
            readOnly={readOnly}
         />
      </Stack>
   );
}
