import { useTheme } from "@mui/material/styles";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import {
  Container,
  CardMedia,
  Rating,
  CardContent,
  CardActions,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { ShoppingCartSharp } from "@mui/icons-material";

const Home = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  //   async function fetchAll
  const fetchAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setProducts(result);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  alignSelf: "center",
                  width: theme.spacing(30),
                  height: theme.spacing(30),
                  objectFit: "contain",
                  pt: theme.spacing(),
                }}
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "-webkit-line-clamp": "1",
                    "-webkit-box-orient": "vertical",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  paragraph
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "-webkit-line-clamp": "2",
                    "-webkit-box-orient": "vertical",
                  }}
                >
                  {product.description}
                </Typography>
                <Typography>{product.price}</Typography>
                <Rating readOnly precision={0.5} value={product.rating.rate} />
              </CardContent>
              <CardActions sx={{ alignSelf: "center" }}>
                <Button variant="contained">
                  <ShoppingCartSharp />
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
