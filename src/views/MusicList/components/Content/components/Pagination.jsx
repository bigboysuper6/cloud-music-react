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
