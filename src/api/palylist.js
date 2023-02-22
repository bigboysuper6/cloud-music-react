import request from "../utils/request";

export const playlistDetail = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/playlist/detail", { params });
};

export const playlistTrackAll = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/playlist/track/all", { params });
};
