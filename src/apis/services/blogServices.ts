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
}
export default BlogServices
