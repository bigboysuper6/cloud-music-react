import request from "../utils/request";

export const userDetail = (args) => {
    const params = new URLSearchParams();
    args.cookie = request.cookie;
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/user/detail", {
        params,
    });
};
