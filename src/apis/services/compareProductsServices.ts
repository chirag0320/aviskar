import axiosInstance from '@/axiosfolder';

class CompareProductsServices {
    static async getCompareProducts(url: string, compareQuery: any) {
        return axiosInstance.post(url, compareQuery);
    }
}

export default CompareProductsServices;
