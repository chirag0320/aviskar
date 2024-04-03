import axiosInstance from '@/axiosfolder';
import axios from 'axios';
import { useCallback, useState } from 'react';

const useCallAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCallFunction = useCallback(
        async (url: string, requestType = 'GET', data = null, params: any = null, callWithPlainAxios: boolean = false) => {
            setLoading(true);
            setError(null);

            try {
                let response;
                switch (requestType) {
                    case 'GET':
                        if (callWithPlainAxios) {
                            response = await axios.get(url);
                        }
                        else {
                            response = await axiosInstance.get(url, { params });
                        }
                        break;
                    case 'POST':
                        let headers = {}
                        if (params) {
                            headers = params
                        }
                        response = await axiosInstance.post(url, data, { headers });
                        break;
                    // Add other request types as needed
                    default:
                        throw new Error('Invalid request type');
                }

                setLoading(false);
                return response.data;
            } catch (error: any) {
                setLoading(false);
                setError(error.message || 'Something went wrong');
            }
        }
        , [])

    return { loading, error, apiCallFunction };
};

export default useCallAPI;
