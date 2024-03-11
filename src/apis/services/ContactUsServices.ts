import axiosInstance from '@/axiosfolder';
import { ContactUsFormDetails } from '@/types/contactUs';

class ContactUsServices {
    static async getReasonsForContact(url: string) {
        return axiosInstance.get(url);
    }
    static async saveContactUsData(url: string, contactUsDetails: ContactUsFormDetails) {
        return axiosInstance.post(url, contactUsDetails)
    }
    static async getConfiguration(url: string) {
        return axiosInstance.get(url);
    }
}

export default ContactUsServices;
