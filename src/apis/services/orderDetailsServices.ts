import axiosInstance from '@/axiosfolder';

class OrderDetailsServices {
    static async getOrderHistoryDetailData(url :string){
        return await axiosInstance.get(url)
    }
}


export default OrderDetailsServices;
