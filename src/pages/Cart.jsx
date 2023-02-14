import React from 'react'
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  useTheme,
  CardContent,
  Box,
  TextField,
  Rating,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSubtotal } from '../utils'
import { addToCart, removeFromCart } from '../feature/cart-slice'
// import { Box } from '@mui/system'
// import { useTheme } from '@emotion/react'

const Cart = () => {
  const theme = useTheme()
  const cartItems = useSelector((state) => state.cart?.value)
  const subTotal = getSubtotal(cartItems)?.toFixed(2)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const updateQuantity = (e, { product, quantity }) => {
    const updatedQuantity = e.target.valueAsNumber
    if (updatedQuantity < quantity) {
      //remove from cart
      dispatch(removeFromCart({ product }))
    } else {
      dispatch(addToCart({ product }))
    }
  }

  const goHome = () => {
    navigate('/')
  }

  const checkOutItems = () => {
    navigate('/checkout')
  }
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cartItems?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: 'flex',
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: 'contain',
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{
                            width: theme.spacing(8),
                          }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          label="quantity"
                          value={quantity}
                          onChange={(e) =>
                            updateQuantity(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Card
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h4">Subtotal</Typography>
              <Typography variant="h5">{subTotal}</Typography>
              {subTotal > 0 ? (
                <Button variant="contained" onClick={checkOutItems}>
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={goHome}>
                  Shop Now
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
