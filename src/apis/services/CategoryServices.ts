import axiosInstance from '@/axiosfolder';
class CategoryServices {
    static async getCategoryData(url: string, filterQuery: any) {
        return axiosInstance.post(url, filterQuery);
    }
    static async getProductDetailsData(url: string) {
        return axiosInstance.get(url);
    }
}

export default CategoryServices
