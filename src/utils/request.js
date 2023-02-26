import axios from "axios";

class requestService {
    cookie = localStorage.getItem("cookie");

    service = axios.create({
        baseURL: process.env.REACT_APP_BASE_API,
        timeout: 5000,
    });

    constructor() {
        this.service.interceptors.request.use(
            function (config) {
                // 在发送请求之前做些什么
                console.log("config", config);
                return config;
            },
            function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            }
        );
        this.service.interceptors.response.use(
            function (respones) {
                console.log("respones", respones);
                return respones;
            },
            function (error) {
                if (error.respones) {
                    console.log("status:", error.respones.status);
                    console.log("data:", error.respones.data);
                    console.log("headers:", error.respones.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
                console.log("请求配置信息:", error.config);
            }
        );
    }
    setCookie = () => {
        this.cookie = localStorage.getItem("cookie");
        console.log("cookie:", this.cookie);
    };
    removeCookie = () => {
        localStorage.removeItem("cookie");
    };
}

const request = new requestService();
export default request;
