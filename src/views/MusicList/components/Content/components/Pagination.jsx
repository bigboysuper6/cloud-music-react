/*
 * @Author: bigboysuper66 bigboysuper6@gmail.com
 * @Date: 2023-02-18 18:34:08
 * @LastEditors: bigboysuper66 bigboysuper6@gmail.com
 * @LastEditTime: 2023-03-07 23:29:08
 * @FilePath: /front/cloud-music-app/src/views/MusicList/components/Content/components/Pagination.jsx
 * @Description:
 *
 * Copyright (c) 2023 by bigboysuper6@gmail.com, All Rights Reserved.
 */
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function ThePagination({ count, onChange }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem 0",
            }}
        >
            <Stack spacing={2}>
                <Pagination
                    count={count}
                    onChange={(event, page) => {
                        onChange(page);
                    }}
                    shape="rounded"
                    size="large"
                />
            </Stack>
        </div>
    );
}
