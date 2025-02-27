import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "https://api.example.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
