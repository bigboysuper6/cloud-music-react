import { configureStore } from "@reduxjs/toolkit";
import auth from "./Slices/auth";
import recommendSongs from "./Slices/recommendSongs";
import music from "./Slices/music";
export default configureStore({
    reducer: {
        auth,
        recommendSongs,
        music,
    },
});
