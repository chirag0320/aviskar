import axiosInstance from '@/axiosfolder';

class CheckoutPageServices {

    static async getCheckoutPageData(url: string) {
        return axiosInstance.get(url);
    }

    static async addOrEditAddress(url : string , addressQuery : any){
        return axiosInstance.post(url,addressQuery);
    }

    static async getInsuranceAndTaxInfo(url : string , body: any){
        return axiosInstance.post(url,body);
    }
}

export default CheckoutPageServices
