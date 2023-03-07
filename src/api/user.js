/*
 * @Author: bigboysuper66 bigboysuper6@gmail.com
 * @Date: 2023-02-07 13:06:21
 * @LastEditors: bigboysuper66 bigboysuper6@gmail.com
 * @LastEditTime: 2023-03-07 23:45:49
 * @FilePath: /front/cloud-music-app/src/api/user.js
 * @Description:
 *
 * Copyright (c) 2023 by bigboysuper6@gmail.com, All Rights Reserved.
 */
import request from "../utils/request";

export const userDetail = (args) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return request.service.get("/user/detail", {
        params,
    });
};
