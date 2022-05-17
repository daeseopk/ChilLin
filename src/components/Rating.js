import * as React from "react";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const StyledRating = styled(Rating)`
   .MuiRating-decimal {
      font-size: ${(prop) => prop.fontSize};
      color: white;
   }
   .MuiRating-iconEmpty {
      color: grey;
   }
   .css-dqr9h-MuiRating-label {
      color: white;
   }
`;

export default function BasicRating({
   rating,
   title,
   marginBottom,
   margin,
   readOnly,
   fontSize,
   setRating,
}) {
   const [value, setValue] = React.useState(0);

   return (
      <Stack spacing={1}>
         <Typography component="legend">{title}</Typography>
         <StyledRating
            fontSize={fontSize}
            style={{
               margin: margin,
               marginBottom: marginBottom,
            }}
            name="ratings"
            value={rating ? rating : value}
            onChange={(event, newValue) => {
               setValue(newValue);
               setRating(newValue);
               console.log(newValue);
            }}
            precision={0.5}
            readOnly={readOnly}
         />
      </Stack>
   );
}
