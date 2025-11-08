import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://med-projukti-backend.vercel.app`
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;