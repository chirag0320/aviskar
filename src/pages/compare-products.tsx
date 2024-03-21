import * as React from "react";
import Seo from "../components/common/Seo";
import Layout from "@/components/common/Layout";
import {
    Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button
} from "@mui/material";
import { Delete1Icon } from '@/assets/icons';

// Utils
import { PageTitle } from "@/components/common/Utils";

// Sample dynamic data for demonstration
const products = [
    {
        ProductImage: "https://imagestoragecdn.blob.core.windows.net/documents/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_210320221703508.png",
        ProductName: "Bullion Beginner Bundle",
        ProductLink: "https://example.com/product/bullion-beginner-bundle",
        Price: "$14,469.32",
        ShortDescription: "Starter Bullion Set: Kangaroo Silver Shine & Gold Cast Bars",
        ProductID: "1111",
        Metal: "Gold & Silver",
        Purity: "9998",
        Weight: "2oz",
        Grade: "A",
        Mint: "Perth Mint",
        Type: "Coin",
        Variant: "abc",
        Condition: "Sourced from Private Collection",
        Year: "2024",
        Packaging: "aaa",
        SuperfundApproved: "No",
        Origin: "a",
        Theme: "abcd",
        Monarch: "Elizabeth II",
    },
    {
        ProductImage: "https://imagestoragecdn.blob.core.windows.net/documents/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_210320221903236.png",
        ProductName: "Another Product",
        ProductLink: "https://example.com/product/another-product",
        Price: "$9,999.99",
        ShortDescription: "Description of another product",
        ProductID: "2222",
        Metal: "Platinum",
        Purity: "8888",
        Weight: "1oz",
        Grade: "B",
        Mint: "Royal Mint",
        Type: "Bar",
        Variant: "xyz",
        Condition: "Sourced from Public Collection",
        Year: "2023",
        Packaging: "bbb",
        SuperfundApproved: "Yes",
        Origin: "b",
        Theme: "efgh",
        Monarch: "King George",
    },
    {
        ProductImage: "https://imagestoragecdn.blob.core.windows.net/documents/2022-AustralianKangaroo-Silver-1oz-StraightOn_210320221903152.png",
        ProductName: "Another Product122",
        ProductLink: "https://example.com/product/another-product",
        Price: "$9,999.99",
        ShortDescription: "Description",
        ProductID: "2762",
        Metal: "Platinum",
        Purity: "88878",
        Weight: "1oz",
        Grade: "D",
        Mint: "Royal Mint",
        Type: "Bar",
        Variant: "xyz",
        Condition: "Sourced from Public Collection",
        Year: "2023",
        Packaging: "bbb",
        SuperfundApproved: "Yes",
        Origin: "b",
        Theme: "efgh",
        Monarch: "King George",
    },
    {
        ProductImage: "https://imagestoragecdn.blob.core.windows.net/documents/a-2007-Six-Coin-Gold-Set-Perth-Mint-OPEN_210320221703591.png",
        ProductName: "Another Product122",
        ProductLink: "https://example.com/product/another-product",
        Price: "$9,999.99",
        ShortDescription: "Description",
        ProductID: "2762",
        Metal: "Platinum",
        Purity: "88878",
        Weight: "1oz",
        Grade: "D",
        Mint: "Royal Mint",
        Type: "Bar",
        Variant: "xyz",
        Condition: "Sourced from Public Collection",
        Year: "2023",
        Packaging: "bbb",
        SuperfundApproved: "Yes",
        Origin: "b",
        Theme: "efgh",
        Monarch: "King George",
    },
];

function CompareProducts() {
    function handleRemoveProduct(ProductID: string): void {
        // Implement the remove product functionality
    }

    return (
        <Layout>
            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="CompareProductsPage" component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Compare Products" />
                    </Box>
                    <Container>
                        <Box className="CompareProductsWrapper">
                            <Button variant="contained" color="primary" className="ClearList">Clear List</Button>
                            <TableContainer
                                className="CompareProductTableWrapper"
                                component={Paper}
                                sx={{}}
                            >
                                <Table className="CompareProductTable" sx={{ minWidth: 650 }} aria-label="CompareProductTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="StickyCell" style={{ minWidth: 200 }}>&nbsp;</TableCell>
                                            {products.map((product, index) => (
                                                <TableCell sx={{ minWidth: { lg: "459px", xs: "400px" } }} key={index} align="center">
                                                    <a href={product.ProductLink} className="ProductName">{product.ProductName}</a>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.keys(products[0]).map((attribute) => (
                                            <TableRow key={attribute}>
                                                <TableCell className="StickyCell">{attribute}</TableCell>
                                                {products.map((product, index) => (
                                                    <TableCell align="center" key={index} className={attribute === 'ProductName' ? 'ProductName' : ''}>
                                                        {attribute === 'ProductName' ? (
                                                            <a href={product.ProductLink} className="productNameLink">{product[attribute]}</a>
                                                        ) : attribute === 'ProductImage' ? (
                                                            <img src={product[attribute]} className="ProductImage" alt={product.ProductName} />
                                                        ) : (
                                                            product[attribute]
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell className="StickyCell">Delete</TableCell>
                                            {products.map((product, index) => (
                                                <TableCell key={index} align="center">
                                                    <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    );
}

export default CompareProducts;
