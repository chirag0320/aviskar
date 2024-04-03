import axiosInstance from '@/axiosfolder';

class OrderDetailsServices {
    static async getOrderDetailsData(url :string){
        return await axiosInstance.get(url)
    }
    static async downloadOrderInvoice(url :string){
        return await axiosInstance.get(url)
    }
}


export default OrderDetailsServices;
