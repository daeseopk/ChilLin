import * as React from "react";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({ rating, title }) {
   rating = rating / 2;

   return (
      <Stack spacing={1}>
         <Typography component="legend">{title}</Typography>
         <Rating
            style={{
               margin: "0 auto",
               marginBottom: "40px",
            }}
            name="ratings"
            defaultValue={rating}
            precision={0.5}
            readOnly
         />
      </Stack>
   );
}
