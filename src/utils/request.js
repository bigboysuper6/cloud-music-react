import axios from "axios";

class requestService {
    service = axios.create({
        baseURL: process.env.REACT_APP_BASE_API,
        timeout: 5000,
    });

    cookie = localStorage.getItem("cookie");
    constructor() {
        this.service.interceptors.response.use(
            function (respones) {
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
