import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { categoryAPI } from "../../api/category";

export default function SelectCategory() {
  const [category, setCategory] = React.useState([]);
  const [cat, setCat] = React.useState("All");

  React.useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await categoryAPI(); 
      setCategory([...new Set(res.map((item) => item.name))]);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching categories:", error);
    }
  };
  
  const handleChange = (event) => {
    setCat(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: "199px", height: 35 }}>
      <Select
        value={cat || "All"}
        onChange={handleChange}
        sx={{
          height: 35,
          width: 150,
          fontFamily: "Roboto",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <MenuItem value="All">
          Category type
        </MenuItem>
        {category.map((item, index) => (
          <MenuItem key={index} value={item.name} sx={{ fontSize: 14 }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
