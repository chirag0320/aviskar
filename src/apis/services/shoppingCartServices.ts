import axiosInstance from '@/axiosfolder';

class ShoppingCartServices {
    static async getShoppingCartData(url: string, cartQuery: any) {
        return axiosInstance.post(url, cartQuery);
    }

    static async updateShoppingCartData(url: string, updatedCartQuery: any) {
        return axiosInstance.patch(url, updatedCartQuery);
    }

    static async clearShoppingCartData(url: string, deleteCartQuery: any) {
        return axiosInstance.post(url, deleteCartQuery);
    }
}

export default ShoppingCartServices
