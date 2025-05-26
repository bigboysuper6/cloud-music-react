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
        removeFromPlayList: (state, action) => {
            const index = action.payload;
            const currentList = state.value.playList.payload.payload;
            currentList.splice(index, 1);
            
            // If removing currently playing song, update playMusic index
            if (state.value.playMusic && state.value.playMusic.index.payload === index) {
                if (currentList.length > 0) {
                    const nextIndex = index >= currentList.length ? currentList.length - 1 : index;
                    state.value.playMusic.index.payload = nextIndex;
                } else {
                    state.value.playMusic = false;
                }
            }
        },
        clearPlayList: (state) => {
            state.value.playList.payload.payload = [];
            state.value.playMusic = false;
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

export const {
    setMusicList: setMusicListRedux,
    setPlayList,
    setMusicIndex,
    setPlayMusic,
    setShowList,
    removeFromPlayList,
    clearPlayList,
} = music.actions;

export default music.reducer;