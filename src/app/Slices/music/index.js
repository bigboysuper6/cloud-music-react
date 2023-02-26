import { createSlice } from "@reduxjs/toolkit";

export const music = createSlice({
    name: "music",
    initialState: {
        value: {
            playMusic: false,
            musicList: [],
            showList: [],
            playList: false,
        },
    },
    reducers: {
        setPlayList: (state, playlist) => {
            console.log("已执行设置播放列表");
            state.value.playList = playlist;
        },
        setMusicList: (state, musicList) => {
            console.log("已执行设置歌单列表");
            state.value.musicList = musicList;
        },
        setShowList: (state, showList) => {
            state.value.showList = showList;
        },
        setPlayMusic: (state, music) => {
            state.value.playMusic = {};
            for (let key in music) {
                console.log("key:", key);
                state.value.playMusic[key] = music[key];
            }
        },
        setMusicIndex: (state, index) => {
            state.value.playMusic["index"] = index;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setMusicList: setMusicListRedux,
    setPlayList,
    setMusicIndex,
    setPlayMusic,
    setShowList,
} = music.actions;

export default music.reducer;
