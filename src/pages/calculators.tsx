import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import { Box, Button } from "@mui/material";
import { navigate } from "gatsby";
import React from "react"

const Calculators = () => {
    return (
        <Layout>
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />
            <Box className="AllCalculators">
                <Button className="CalculatorLink" variant="contained" onClick={() => navigate("/vault-calculator")}>Vault Calculator</Button>
                <Button className="CalculatorLink" variant="contained" onClick={() => navigate("/shipping-calculator")}>Shipping Calculator</Button>
            </Box>
        </Layout>
    )
}

export default Calculators;