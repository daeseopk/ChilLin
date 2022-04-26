import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

const StyledBox = styled(Box)`
   .MuiOutlinedInput-notchedOutline {
      border-style: none;
   }
   .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
      color: white;
   }
   .MuiInputLabel-root {
      color: rgb(255, 255, 255, 0.3);
   }
   .MuiSelect-select {
      color: white;
   }
   .MuiSvgIcon-root {
      color: rgb(255, 255, 255, 0.3);
   }
`;

export default function BasicSelect({ Sort, setSort }) {
   const handleChange = (event) => {
      setSort(event.target.value);
   };

   return (
      <StyledBox sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={Sort}
               label="Sort By"
               onChange={handleChange}>
               <MenuItem value={"Recent"}>Most Recent Comments</MenuItem>
               <MenuItem value={"Rating"}>Rating</MenuItem>
               <MenuItem value={"Like"}>Like Count</MenuItem>
            </Select>
         </FormControl>
      </StyledBox>
   );
}
