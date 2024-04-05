import { generateGUID } from "@/components/common/Utils";
import { store } from "@/redux/store";
import axios, { AxiosResponse, AxiosError } from "axios";

interface CustomHeaders {
    Storecode: number;
    Validkey: string;
}
const axiosInstance = axios.create({
    baseURL: "https://qmapistaging.qmint.com/api/v1/",
    headers: {
        "Storecode": 12,
        "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
    }
    // timeout: 5000, // Timeout in milliseconds
});
export const axiosInstanceForPDF = axios.create({
    baseURL: "https://qmapistaging.qmint.com/api/v1/",
    headers: {
        "Storecode": 12,
        "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo",
        "Content-Type": "application/pdf",
        "Accept": "application/pdf",

    },
    responseType: "arraybuffer"
    // timeout: 5000, // Timeout in milliseconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const { isLoggedIn, userDetails } = store.getState().homePage;
        if (isLoggedIn) {
            config.headers.Authorization = `Bearer ${userDetails?.token}`
            config.headers['LogInUser'] = 'true';
            config.headers['SessionId'] = userDetails?.customerGuid
        } else {
            config.headers['LogInUser'] = 'false';
            config.headers['SessionId'] = generateGUID()
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
axiosInstanceForPDF.interceptors.request.use(
    (config) => {
        const { isLoggedIn, userDetails } = store.getState().homePage;
        if (isLoggedIn) {
            config.headers.Authorization = `Bearer ${userDetails?.token}`
            config.headers['LogInUser'] = 'true';
            config.headers['SessionId'] = userDetails?.customerGuid
        } else {
            config.headers['LogInUser'] = 'false';
            config.headers['SessionId'] = generateGUID()
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // You can handle successful responses here
        return response;
    },
    (error: AxiosError) => {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log(error.response.data,".data"); // Backend error response data
        //     console.log(error.response.status,"error.response.status"); // Backend error response status
        //     console.log(error.response.headers,"error.response.headers"); // Backend error response headers
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log('Error', error.message);
        // }

        // You can handle errors here (e.g., redirecting for unauthorized requests)
        return Promise.reject(error);
    }
);
axiosInstanceForPDF.interceptors.response.use(
    (response: AxiosResponse) => {
        // You can handle successful responses here
        return response;
    },
    (error: AxiosError) => {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log(error.response.data,".data"); // Backend error response data
        //     console.log(error.response.status,"error.response.status"); // Backend error response status
        //     console.log(error.response.headers,"error.response.headers"); // Backend error response headers
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log('Error', error.message);
        // }

        // You can handle errors here (e.g., redirecting for unauthorized requests)
        return Promise.reject(error);
    }
);

export default axiosInstance;
