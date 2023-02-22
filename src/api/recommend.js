import request from "../utils/request";

export const recommendSongs = () => {
    return request.service.post("/recommend/songs", { cookie: request.cookie });
};

export const recommendResource = () => {
    return request.service.post("/recommend/resource", {
        cookie: request.cookie,
    });
};
