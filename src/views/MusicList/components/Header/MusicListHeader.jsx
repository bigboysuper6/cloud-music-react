import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import Dialogs from "./components/Dialogs";
import { useSelector } from "react-redux";
import { playlistDetail } from "../../../../api/palylist";
import limitSize from "../../../../utils/limitSize";
import {
    setPlayMusic,
    setMusicIndex,
    setPlayList,
} from "../../../../app/Slices/music/index";
import { useDispatch } from "react-redux";

function MusicListHeader(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const daySongsState = useSelector((state) => state.recommendSongs.value);
    const songlist = useSelector((state) => state.music.value.musicList);
    console.log("location.pathname", location.pathname);
    const [playListDetail, setPlayListDetail] = useState({});
    const [authname, setAuthname] = useState("");
    useEffect(() => {
        getPlayListDetailData();
    }, []);
    async function getPlayListDetailData() {
        if (location.pathname !== "/daysongs") {
            const match = matchPath(
                { path: "/songlist/:id" },
                location.pathname
            );
            let { id } = match.params;
            const { data } = await playlistDetail({ id: id });
            const { playlist } = data;
            const { nickname } = playlist.creator;
            console.log("歌单详细信息", playlist);
            console.log("创建者名字", nickname);
            setPlayListDetail(data.playlist);
            setAuthname(nickname);
        } else {
            setPlayListDetail(false);
            setAuthname(false);
        }
    }
    function getTime(createtime) {
        let time = new Date(createtime);
        return (
            time.getUTCFullYear() +
            "年" +
            time.getMonth() +
            "月" +
            time.getDate() +
            "日"
        );
    }
    function getCount(playCount) {
        if (playCount > 10000) return Math.round(playCount / 10000) + "万";
        else return playCount;
    }
    const HeaderFlex = styled.div`
        width: 61rem;
        margin: 3.75rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    const ImagePlayList = styled.img`
        width: 290px;
        border-radius: 0.625rem;
    `;
    const ContentPlayList = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 620px;
        height: 240px;
    `;
    const handlePlay = () => {
        console.log("songlist:", songlist);
        let list = songlist.payload;
        const MusicData = {
            picUrl: list[0].al.picUrl,
            id: list[0].id,
            auth: list[0].ar,
            name: list[0].name,
        };
        dispatch(setPlayMusic(MusicData));
        dispatch(setPlayList(songlist));
        dispatch(setMusicIndex(0));
    };
    return (
        <div>
            <HeaderFlex>
                <ImagePlayList
                    src={limitSize(
                        location.pathname !== "/daysongs"
                            ? playListDetail.coverImgUrl
                            : daySongsState.payload.dailySongs[0].al.picUrl,
                        { param: "290y290" }
                    )}
                ></ImagePlayList>
                <ContentPlayList>
                    <Typography
                        sx={{
                            padding: 0,
                            margin: 0,
                            fontSize: "35px",
                            fontWeight: "bold",
                            color: "rgb(0,0,0)",
                        }}
                        variant="h1"
                        component="h1"
                    >
                        {location.pathname !== "/daysongs"
                            ? playListDetail.name
                            : "每日歌曲推荐"}
                    </Typography>
                    {location.pathname !== "/daysongs" && (
                        <div>
                            <Typography
                                gutterBottom
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "rgb(180,180,180)",
                                }}
                            >
                                {authname} {getTime(playListDetail.createTime)}
                                创建
                            </Typography>
                            <Typography
                                gutterBottom
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "13px",
                                    color: "rgb(180,180,180)",
                                }}
                            >
                                播放量:{getCount(playListDetail.playCount)}{" "}
                                最近一次更新于
                                {getTime(playListDetail.updateTime)}
                            </Typography>
                        </div>
                    )}

                    <Dialogs description={playListDetail.description} />
                    <Button
                        sx={{
                            height: "40px",
                            width: "100px",
                            borderRadius: "0.625rem",
                        }}
                        variant="contained"
                        startIcon={<PlayArrowSharpIcon />}
                        onClick={handlePlay}
                    >
                        播放
                    </Button>
                </ContentPlayList>
            </HeaderFlex>
        </div>
    );
}

export default MusicListHeader;
