import axiosInstance from '@/axiosfolder';
import { ENDPOINTS } from '@/utils/constants';
export interface IloginUserBody {
  email: string
  password: string
  ImpersonateId?: string | number
}
class ConfigServices {
  static async details(url: string) {
    return axiosInstance.get(url)
    // .then((res) => res.data).catch((error) => {
    //   throw new Error(error)
    // })
  }
  static async membershipPlanDetails(url: string) {
    return axiosInstance.get(url)
    // .then((res) => res.data).catch((error) => {
    //   throw new Error(error)
    // })
  }
  static async homePageSectiondetails(url: string) {
    return axiosInstance.get(url)
    // .then((res) => res.data).catch((error) => {
    //   throw new Error(error)
    // })
  }
  static async categoriesList(url: string, data: any) {
    return axiosInstance.post(url, data)

  }
  static async loginUser(url: string, data: IloginUserBody) {
    //   {
    //     "email": "usernewtest425@yopmail.com",
    //     "password": "Pass#123",
    //     "ImpersonateId":0
    // }
    return await axiosInstance.post(url, data)

  }
  static async logOutUser() {
    //   {
    //     "email": "usernewtest425@yopmail.com",
    //     "password": "Pass#123",
    //     "ImpersonateId":0
    // }s
    return await axiosInstance.post(ENDPOINTS.logOutUser, {})

  }
  static async ImpersonateSignIn(token:any) {
    return await axiosInstance.post(ENDPOINTS.ImpersonateSignIn, {},{params:{token}})
  }
  // static add(data: GuidelineTitleParams) {
  //   return api({
  //     method: 'POST',
  //     endpoint: '/guideline/add',
  //     usingAuthToken: true,
  //     data,
  //   })
  // }

  // static update(data: GuidelinelInputs[]) {
  //   return api({
  //     method: 'PUT',
  //     endpoint: '/guideline/update',
  //     usingAuthToken: true,
  //     data,
  //   })
  // }

  // static deleteGuideline(data: GuidelineIdParams) {
  //   return api({
  //     method: 'DELETE',
  //     endpoint: `/guideline/delete/${data.id}`,
  //     usingAuthToken: true,
  //     data,
  //   })
  // }
  static async getLiveDashboardChartData(url: string) {
    return axiosInstance.get(url)
  }

  static async sendVerificationEmailAPI(url:any) {
    return await axiosInstance.post(url)
  }
}
export default ConfigServices
