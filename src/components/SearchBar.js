import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";

function SearchBar({ width, value }) {
   const CssTextField = styled(TextField)({
      "& .MuiInput-underline:after": {
         borderBottomColor: "White",
      },
      "& .MuiInput-underline:before": {
         borderBottomColor: "White",
      },
      "& label.Mui-focused": {
         color: "white",
      },
      "& .MuiInput-root": {
         color: "white",
      },
   });
   const { handleSubmit, control } = useForm();
   function onSubmit(d) {
      window.location.href = `/Search/word=${d.input}`;
   }
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Controller
            render={({ field }) => (
               <CssTextField
                  {...field}
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
      </form>
   );
}

export default SearchBar;
