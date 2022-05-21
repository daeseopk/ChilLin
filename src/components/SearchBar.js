import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";

function SearchBar({ width, value }) {
   const CssTextField_=useRef();
   
   const CssTextField = styled(TextField)({
      "& .MuiInput-underline:after": {
         borderBottomColor: "white",
      },
      "& .MuiInput-underline:before": {
         borderBottomColor: "white",
         opacity:"0" 
      },
      "& label.Mui-focused": {
         color: "white",
      },
      "& .MuiInput-root": {
         color: "white",
      },
      "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root":{
         opacity:"0"
      }
   });
   const { handleSubmit, control } = useForm();
   function onSubmit(d) {
      d.input?
      (
         window.location.href = `/Search/word=${d.input}`
      ):
      (
         CssTextField_.current.children[0].focus()
      )
      
   }
   const onKeyPress_ =(e)=>{
      console.log(e.key);
   }
   return (
      <div>
         {/* TODO : enter 입력 시 handleSubmit(onSubmit) */}
         <Controller
            render={({ field }) => (
               <CssTextField
                  {...field}
                  onKeyPress={onKeyPress_}
                  ref={CssTextField_}
                  id="standard-basic"
                  label={value ? `Current Search : ${value}` : "Search"}
                  variant="standard"
                  style={{
                     width: `${width}`,
                  }}></CssTextField>
            )}
            control={control}
            name="input"
         />
         <button
         onClick={handleSubmit(onSubmit)}
            style={{
               backgroundColor: "inherit",
               cursor: "pointer",
               border: "none",
               width: "35px",
               height: "35px",
               position: "relative",
               marginRight: "0px",
               marginLeft: "0px",
               top: "15px",
            }}>
            <SearchIcon
               sx={{
                  color: "white",
                  fontSize: "30px",
               }}
            />
         </button>
      </div>
   );
}

export default SearchBar;
