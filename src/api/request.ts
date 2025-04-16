import axios from 'axios';

import { AxiosInstance } from 'axios';

const httpRequest: AxiosInstance = axios.create({
    baseURL: "https://walrus-app-yz4yn.ondigitalocean.app/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpRequest;
