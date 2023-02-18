import { IconButton } from '@mui/material'
import { Badge } from '@mui/material'
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Autocomplete,
  TextField,
  Box,
  Menu,
} from '@mui/material'
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'
import { getItemsCount } from '../utils'
import { styled, alpha } from '@mui/material/styles'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { fetchAllCategories } from '../feature/categories-slice'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTheme } from '@emotion/react'
import SearchIcon from '@mui/icons-material/Search'
import { useAuth } from '../firebase/AuthContext'
// import { signOutUser } from '../firebase/useProvideAuth'

const Search = styled('section')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiTextField-root': {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.common.white,
  },
}))

const SearchIconWrapper = styled('section')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
}))

const SearchBar = () => {
  const products = useSelector((state) => state.products?.value)
  const categories = useSelector((state) => state.categories?.value)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const searchTerm = searchParams.get('searchTerm')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedCategory(category ? category : 'all')
  }, [category])

  if (!categories.length) {
    dispatch(fetchAllCategories())
  }

  const handleCategoryChange = (e) => {
    const { value } = e.target
    setSelectedCategory(value)
    navigate(
      value === 'all'
        ? '/'
        : `/?category=${value}${searchTerm ? '&seachterm=' + searchTerm : ''}`
    )
  }

  const handleSearchChange = (searchText) => {
    if (searchText) {
      navigate(
        selectedCategory === 'all'
          ? `?searchTerm=${searchText}`
          : `/?category=${selectedCategory}&searchTerm=${searchText}`
      )
    } else {
      navigate(
        selectedCategory === 'all' ? `/` : `/?category=${selectedCategory}`
      )
    }
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        size="small"
        sx={{
          m: 1,
          textTransform: 'capitalize',
          '&': {
            '::before': {
              ':hover': {
                border: 'none',
              },
            },
            '::before, &::after': {
              border: 'none',
            },
            '.MuiSelect-standard': {
              color: 'common.white',
            },
            '.MuiSelect-icon': {
              fill: theme.palette.common.white,
            },
          },
        }}
        variant="standard"
        // label
      >
        <MenuItem sx={{ textTransform: 'capitalize' }} value="all">
          All
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            key={category}
            value={category}
            sx={{ textTransform: 'capitalize' }}
          >
            {category}
          </MenuItem>
        ))}
      </Select>

      <StyledAutocomplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        onChange={(e, value) => {
          console.log(value)
          handleSearchChange(value?.label)
        }}
        disablePortal
        options={Array.from(
          selectedCategory === 'all'
            ? products
            : products.filter((prod) => prod.category === selectedCategory),
          (prod) => ({ id: prod.id, label: prod.title })
        )}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  )
}

const Header = () => {
  const { user, signOutUser } = useAuth()
  const cartItems = useSelector((state) => state.cart.value)
  const count = getItemsCount(cartItems)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const navigateToCart = () => {
    navigate('/cart')
  }

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await signOutUser()
    navigate('/login')
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="sticky" sx={{ py: 1 }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/">Ecomm Store</StyledLink>
          </Typography>
          <SearchBar />
          <Box sx={{ display: { md: 'flex' } }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="shows cart items count"
              color="inherit"
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          {user ? (
            <Button onClick={handleProfileMenuOpen} color="inherit">
              Hello {user.displayName ?? user.email}
            </Button>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  )
}

export default Header
