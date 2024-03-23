import axiosInstance from '@/axiosfolder';
class OrderConfirmationDetailsServices {
    static async getOrderConfimationDetails(url: string) {
        return axiosInstance.get(url);
    }
}

export default OrderConfirmationDetailsServices
