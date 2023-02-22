import request from "../utils/request";

export const userDetail = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/user/detail", {
        params,
        cookie: request.cookie,
    });
};
