import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import CalculatorCard from "@/components/partials/calculator/CalculatorCard";
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
                <Button onClick={() => navigate("/vault-calculator")} className="CalculatorLink">
                    <CalculatorCard
                        title="Vault Calculator"
                        calculatorType={1}
                    />
                </Button>
                <Button onClick={() => navigate("/shipping-calculator")} className="CalculatorLink">
                    <CalculatorCard
                        title="Shipping Calculator"
                        calculatorType={1}
                    />
                </Button>
            </Box>
        </Layout>
    )
}

export default Calculators;