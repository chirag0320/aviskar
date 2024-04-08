import axiosInstance from "@/axiosfolder";
import { AccountQuery, AddressQuery } from "@/types/myVault";

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
}

export default MyVaultServices;