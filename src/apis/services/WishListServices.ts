import axiosInstance from '@/axiosfolder';

class WishListServices {
    static async getWishListData(url: string, wishListQuery: any) {
        return axiosInstance.post(url, wishListQuery);
    }

    static async updateWishListData(url: string, updatedWishListQuery: any) {
        return axiosInstance.patch(url, updatedWishListQuery);
    }

    static async deleteWishListData(url: string, deleteWishListQuery: any) {
        return axiosInstance.post(url, deleteWishListQuery);
    }

    static async addToWishList(url: string, wishListQuery: any) {
        return axiosInstance.post(url, wishListQuery);
    }

    static async addToWishListToShoppingCart(url: string, items: any) {
        return axiosInstance.patch(url, items);
    }
}

export default WishListServices
