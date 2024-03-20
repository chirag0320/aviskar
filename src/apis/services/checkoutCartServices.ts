import axiosInstance from '@/axiosfolder';

class CheckoutPageServices {

    static async getCheckoutPageData(url: string) {
        return axiosInstance.get(url);
    }
}

export default CheckoutPageServices
