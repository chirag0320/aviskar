import axiosInstance from '@/axiosfolder';

class OrderDetailsServices {
    static async getOrderDetailsData(url: string) {
        return await axiosInstance.get(url)
    }
    static async downloadOrderInvoice(url: string) {
        return await axiosInstance.get(url, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "application/pdf",
                "Accept": "application/pdf",
            }
        })
    }
}


export default OrderDetailsServices;
