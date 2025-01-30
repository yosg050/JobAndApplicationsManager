import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface SearchInputProps {
  setQuery: (query: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ setQuery }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField
        id="outlined-basic"
        label="חיפוש חופשי"
        dir="rtl"
        variant="outlined"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        sx={{
          "& .MuiInputLabel-root": {
            right: "1rem", // Adjust the right margin for the label
            left: "auto",
            transformOrigin: "right",
          },
          "& .MuiInputBase-input": {
            textAlign: "right",
          },
          "& legend": {
            textAlign: "right",
          },
          "& .MuiInputLabel-formControl": {
            right: "1.77rem",
            left: "auto",
          },
          "& .MuiInputLabel-shrink": {
            right: "1.77rem",
            left: "auto",
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
