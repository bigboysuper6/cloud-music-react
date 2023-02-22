import { createSlice } from "@reduxjs/toolkit";

export const recommendSongs = createSlice({
    name: "recommendSongs",
    initialState: {
        value: false,
    },
    reducers: {
        changeDaySongsState: (state, usrStatus) => {
            state.value = usrStatus;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeDaySongsState } = recommendSongs.actions;

export default recommendSongs.reducer;
