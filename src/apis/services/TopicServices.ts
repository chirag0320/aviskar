import axiosInstance from '@/axiosfolder';

class TopicServices {
    static async getTopicDetails(url: string) {
        return await axiosInstance.post(url);
    }
}

export default TopicServices
