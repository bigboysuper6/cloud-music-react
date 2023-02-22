import { createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";

export const auth = createSlice({
    name: "auth",
    initialState: {
        value: {
            status: request.cookie === null ? false : true,
        },
    },
    reducers: {
        changeStatus: (state, status) => {
            state.value.status = status;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeStatus } = auth.actions;

export default auth.reducer;
