import { IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { getItemsCount } from "../utils";
import { styled, alpha } from "@mui/material/styles";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../feature/categories-slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));
const SearchBar = () => {
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);
  if (!categories.length) {
    dispatch(fetchAllCategories);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    navigate(selectedCategory === "all" ? "/" : `/?category=${value}`);
  };
  return (
    <Search>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
          "&": {},
        }}
        variant="standard"
        // label
      >
        <MenuItem sx={{ textTransform: "capitalize" }} value="all">
          All
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            key={category}
            value={category}
            sx={{ textTransform: "capitalize" }}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={products}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Search>
  );
};

const Header = () => {
  const cartItems = useSelector((state) => state.cart.value);
  const count = getItemsCount(cartItems);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Fake Store
        </Typography>
        <SearchBar />
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
