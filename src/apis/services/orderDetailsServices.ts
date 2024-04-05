import axiosInstance, { axiosInstanceForPDF } from '@/axiosfolder';

class OrderDetailsServices {
    static async getOrderDetailsData(url :string){
        return await axiosInstance.get(url)
    }
    static async downloadOrderInvoice(url :string){
        return await axiosInstanceForPDF.get(url)
    }
}


export default OrderDetailsServices;
