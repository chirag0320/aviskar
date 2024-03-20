import React from "react"
import { Box, Button, Container, IconButton, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"

// Assets
import { MinusIcon, PlusIcon } from "@/assets/icons"

// Data
import { wishlistData } from "@/utils/data"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"


function Wishlist() {
  return (
    <Layout>
      <Seo
        keywords={[`QMint Wishlist`]}
        title="Wishlist"
        lang="en"
      />
      <PageTitle title="Wishlist" />
      <Container id="Pagewishlist" maxWidth="lg">
        <TableContainer>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Products</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlistData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left"><img src={row.image} width={100} height={100} /></TableCell>
                  <TableCell><Button href="#" color="secondary">{row.name}</Button></TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Stack className="Quantity">
                      <IconButton className="Minus"><MinusIcon /></IconButton>
                      <TextField type="number" name="Qty" defaultValue={row.qty} />
                      <IconButton className="Plus"><PlusIcon /></IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack className="ActionWrapper">
          <Stack className="Left">
            <Button color="primary" variant="contained">Update Wishlist</Button>
            <Button color="primary" variant="outlined">Email a friend</Button>
          </Stack>
          <Stack className="Right">
            <Button color="primary" variant="contained">Add to cart</Button>
          </Stack>
        </Stack>
        <Box className="WishlistLink">
          <Typography>Your wishlist URL for sharing</Typography>
          <Button>http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00</Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Wishlist