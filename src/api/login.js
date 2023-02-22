import request from "../utils/request";

export const loginStatus = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.post("/login/status", {
        cookie: request.cookie,
        params,
    });
};

export const loginQrKey = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/login/qr/key", { params });
};

export const loginQrCreate = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/login/qr/create", { params });
};

export const loginQrCheck = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/login/qr/check", { params });
};
