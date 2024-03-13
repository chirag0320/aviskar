import React from 'react'
import CalculatorCard from '../shipping-insurance-calculator/CalculatorCard'
import { Box } from '@mui/material'
import { useAppSelector } from '@/hooks'
import { Metals, WeightTypes } from '@/types/enums'
import { Calculator } from '@/redux/reducers/calculatorsReducer'

const CalculatorCards = () => {
    const calculators = useAppSelector(state => state.calculators.calculators);
    // console.log(calculators);

    return (
        <Box className="CardsWrapper">
            {/* Note :- Make unique key later */}
            {calculators.map((cal: Calculator, index: number) => (
                <CalculatorCard
                    key={cal.Metal + "#" + index}
                    title={Metals[cal.Metal as keyof typeof Metals]}
                    weight={cal.MetalWeight.toString()}
                    weightType={WeightTypes[cal.MetalWeightType as keyof typeof WeightTypes]}
                />
            ))}
        </Box>
    )
}

export default CalculatorCards