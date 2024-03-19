import axiosInstance from '@/axiosfolder';
import { Calculator } from '@/redux/reducers/calculatorsReducer';

class CalculatorsServices {
    static async saveCalculatorsData(url: string, calculatorBody: {
        CalculatorType: number,
        CalculatorData: Calculator[]
    }) {
        return axiosInstance.post(url, calculatorBody)
    }
}

export default CalculatorsServices;
