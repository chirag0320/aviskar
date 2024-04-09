import axiosInstance from "@/axiosfolder";
import { AccountQuery, AddressQuery, rewardPointsHistoryData } from "@/types/myVault";

class MyVaultServices {
    // ACCOUNTS
    static async getAccounts(url: string) {
        return axiosInstance.get(url);
    }

    static async addOrEditAccount(url: string, accountQuery: AccountQuery) {
        return axiosInstance.post(url, accountQuery);
    }

    // ADDRESSES
    static async getAddresses(url: string) {
        return axiosInstance.get(url);
    }

    static async addOrEditAddresses(url: string, addressQuery: AddressQuery) {
        return axiosInstance.post(url, addressQuery);
    }

    static async deleteAddress(url: string) {
        return axiosInstance.delete(url);
    }

    static async getRewardPointsHistory(url: string, rewardPointsHistoryData: rewardPointsHistoryData) {
        return axiosInstance.post(url, rewardPointsHistoryData);
    }

    // BUY BACK ORDER HISTORY
    static async getBuyBackOrderHostory(url: string, query: any) {
        return axiosInstance.post(url, query);
    }
}

export default MyVaultServices;