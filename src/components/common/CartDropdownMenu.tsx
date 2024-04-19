import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { navigate, Link } from 'gatsby'
import React from 'react'

function CartDropdownMenu() {
    return (
        <>
            <Box className="CartDropdownMenuWrapper">
                <Box className="CartDropdownMenuHeader">
                    <Typography variant="titleLarge">There are <Link area-label="shopping-cart-link" to="/shopping-cart">2 items</Link> in cart
                    </Typography>
                </Box>
                <Divider />
                <Box className="CartDropdownMenuBody">
                    <Stack className='ProductWrapper'>
                        <Box className="ProductImagewrapper">
                            <img src="https://qmintstoremedia.blob.core.windows.net/pictures/products/usquarterobverse_120320242303283.png?sv=2018-03-28&sr=b&sig=yw%2FlwoYtcC1LW69zXj7YmCR%2F8kz5FYYbUXWlN%2FALu%2Bc%3D&st=2024-03-11T13%3A50%3A28Z&se=3024-03-12T13%3A50%3A28Z&sp=r&c=638458482283304375" alt="product-img" />
                        </Box>
                        <Box className="ProductInfowrapper">
                            <Typography component='h3' className="ProductName">Bullion Beginner Bundle</Typography>
                            <Typography variant='overline' className="ProductPrice">$16,493.78</Typography>
                        </Box>
                    </Stack>
                    <Stack className='ProductWrapper'>
                        <Box className="ProductImagewrapper">
                            <img src="https://qmintstoremedia.blob.core.windows.net/pictures/products/usquarterobverse_120320242303283.png?sv=2018-03-28&sr=b&sig=yw%2FlwoYtcC1LW69zXj7YmCR%2F8kz5FYYbUXWlN%2FALu%2Bc%3D&st=2024-03-11T13%3A50%3A28Z&se=3024-03-12T13%3A50%3A28Z&sp=r&c=638458482283304375" alt="product-img" />
                        </Box>
                        <Box className="ProductInfowrapper">
                            <Typography component='h3' className="ProductName">Bullion Beginner Bundle</Typography>
                            <Typography variant='body1' className="ProductPrice">$16,493.78</Typography>
                        </Box>
                    </Stack>
                    <Stack className='ProductWrapper'>
                        <Box className="ProductImagewrapper">
                            <img src="https://qmintstoremedia.blob.core.windows.net/pictures/products/usquarterobverse_120320242303283.png?sv=2018-03-28&sr=b&sig=yw%2FlwoYtcC1LW69zXj7YmCR%2F8kz5FYYbUXWlN%2FALu%2Bc%3D&st=2024-03-11T13%3A50%3A28Z&se=3024-03-12T13%3A50%3A28Z&sp=r&c=638458482283304375" alt="product-img" />
                        </Box>
                        <Box className="ProductInfowrapper">
                            <Typography component='h3' className="ProductName">Bullion Beginner Bundle</Typography>
                            <Typography variant='body1' className="ProductPrice">$16,493.78</Typography>
                        </Box>
                    </Stack>
                </Box>
                <Divider />
                <Stack className="CartDropdownMenuFooter">
                    <Button variant="outlined" size="medium" onClick={() => navigate("/shopping-cart")}>Go to cart</Button>
                    <Button variant="contained" size="medium" color="success">Checkout</Button>
                </Stack>
            </Box>
        </>)
}

export default CartDropdownMenu