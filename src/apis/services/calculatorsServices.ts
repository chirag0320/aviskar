import axiosInstance from '@/axiosfolder';
import { Calculator } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';

class CalculatorsServices {
    static async saveCalculatorsData(url: string, calculatorBody: {
        CalculatorType: number,
        CalculatorData: Calculator[]
    }) {
        return axiosInstance.post(url, calculatorBody)
    }

    static async getAIdata(question: any) {
        return axiosInstance.post(ENDPOINTS.qmintopenaidata, {}, { params: { question } })
    }
}


export default CalculatorsServices;
