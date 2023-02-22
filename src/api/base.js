import request from "../utils/request";

export const banner = () => {
    return request.service.get("/banner");
};

export const personalized = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/personalized", { params });
};

export const songUrl = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/song/url", { params });
};
