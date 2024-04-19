import axiosInstance from '@/axiosfolder';
import { ENDPOINTS } from '@/utils/constants';

class BlogServices {
  static async BlogList(data:any) {
    return axiosInstance.post(ENDPOINTS.BlogList, data)
  }
  static async BlogDetails(pathName:any) {
    return axiosInstance.get(ENDPOINTS.BlogDetails + '/' + pathName)
  }
  static async NewsList(data:any) {
    return axiosInstance.post(ENDPOINTS.NewsList, data)
  }
  static async NewsDetails(pathName:any) {
    return axiosInstance.get(ENDPOINTS.NewsDetails  + '/' + pathName)
  }
}
export default BlogServices
