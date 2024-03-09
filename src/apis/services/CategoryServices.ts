import axiosInstance from '@/axiosfolder';

class CategoryServices {
    static async getCategoryData(url: string, filterQuery: any) {
        return axiosInstance.post(url, filterQuery);
    }
}
export default CategoryServices
