import axios from 'axios';

import { AxiosInstance } from 'axios';

const httpRequest: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpRequest;
