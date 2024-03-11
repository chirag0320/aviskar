import axiosInstance from '@/axiosfolder';
import { ENDPOINTS } from '@/utils/constants';

class BlogServices {
//   static async details(url: string) {
//     return axiosInstance.get(url)
//   }
//   static async membershipPlanDetails(url: string) {
//     return axiosInstance.get(url)
//   }
//   static async homePageSectiondetails(url: string) {
//     return axiosInstance.get(url)
//   }
//   static async categoriesList(url: string, data: any) {
//     return axiosInstance.post(url, data)
//   }
  static async BlogList(data:any) {
    return axiosInstance.post(ENDPOINTS.BlogList, data)
  }
  static async BlogDetails(pathName:any) {
    return axiosInstance.get(ENDPOINTS.BlogDetails + '/' + pathName)
  }
  static async NewsList(data:any) {
    return axiosInstance.post(ENDPOINTS.NewsList, data)
  }
  static async NewsDetails(params:any) {
    return axiosInstance.get(ENDPOINTS.NewsDetails)
  }
}
export default BlogServices
