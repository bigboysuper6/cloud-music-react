import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Favorite, Layers } from "@mui/icons-material";
import { Link } from "@mui/material";
import * as React from "react";
import { display } from "@mui/system";
import Box from "@mui/material/Box";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { styled as styled_M, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { Slider } from "@mui/material";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useSelector, useDispatch } from "react-redux";
import { useSlider } from "@mui/base";
import store from "../app/store";
import limitSize from "../utils/limitSize";
import {
    setPlayMusic,
    setMusicStatus,
    setMusicIndex,
    setPlay,
} from "../app/Slices/music";
import { songUrl } from "../api/base";
const Container = styled.div`
    bottom: 0;
    position: fixed;
    min-height: 80px;
    width: 976px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.625rem 0.625rem 0 0;
    display: flex;
    justify-content: space-between;
    background-color: rgba(45, 45, 45, 0.95);
`;

const ContainerLeft = styled.div`
    width: 30%;
    display: flex;
    align-items: center;

    border-radius: 0.625rem;
`;

const ImageMusic = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin: 0px 5% 0px 0.5rem;
`;

const MusicInformation = styled.div`
    margin: 0;
`;

const ContainerMid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.625rem;
`;

const ContainerEnd = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: end;
`;

const MusicName = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1rem;
    color: rgb(180, 180, 180);
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Bar = (props) => {
    const playMusic = useSelector((state) => state.music.value.playMusic);
    const playList = useSelector((state) => state.music.value.playList);
    const dispatch = useDispatch();
    const audio = React.useRef();
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);
    const [musicUrl, setMusicUrl] = React.useState("");
    const [musicData, setMusicData] = React.useState();

    React.useEffect(() => {
        getPlayMusic();
    }, [playMusic]);

    React.useEffect(() => {
        console.log("status:", playMusic.status);
        if (playMusic) {
            if (playMusic["status"]) audio.current.play();
            else audio.current.pause();
        }
    }, [getPlayMusic, playMusic]);

    React.useEffect(() => {
        console.log("playList", playList);
    }, [playList]);

    async function getPlayMusic() {
        if (playMusic)
            if (playMusic.payload.id !== "") {
                console.log("playMusic", playMusic);
                const { data: musicData } = await songUrl({
                    id: playMusic.payload.id,
                });
                console.log("musicData", musicData.data);
                console.log("musicData Url", musicData.data[0].url);
                setMusicUrl(musicData.data[0].url);
            }
    }

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }

    const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

    const lightIconColor =
        theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.4)"
            : "rgba(0,0,0,0.4)";

    const timeChange = () => {
        let time = props.songslist.dt;
        let minutes = parseInt(time / (60 * 1000));
        let seconds = parseInt(time / 1000 - minutes * 60);
        if (minutes < 10) {
            minutes = "0" + minutes.toString();
        }
        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        }
        let time_ms = minutes + ":" + seconds;
        return time_ms;
    };

    function getPlayList() {
        console.log("播放列表Bar:", playList);
    }

    function handleLastMusic() {
        console.log(playMusic);
        let index = playMusic.index.payload;
        if (index !== 0) {
            console.log("当前音乐索引", index.payload);
            index -= 1;
            console.log("当前播放列表", playList.payload.payload);
            const music = playList.payload.payload[index];
            const MusicData = {
                picUrl: music.al.picUrl,
                id: music.id,
                auth: music.ar,
                name: music.name,
            };
            console.log("前一个音乐", MusicData);
            dispatch(setPlayMusic(MusicData));
            dispatch(setPlay());
            dispatch(setMusicIndex(index));
        }
    }
    function handleNextMusic() {
        console.log(playMusic);
        let index = playMusic.index.payload;
        if (index !== playList.length - 1) {
            console.log("当前音乐索引", index);
            index += 1;
            console.log("当前播放列表", playList.payload.payload);
            const music = playList.payload.payload[index];
            const MusicData = {
                picUrl: music.al.picUrl,
                id: music.id,
                auth: music.ar,
                name: music.name,
            };
            console.log("前一个音乐", MusicData);
            dispatch(setPlayMusic(MusicData));
            dispatch(setPlay());
            dispatch(setMusicIndex(index));
        }
    }

    return (
        <React.Fragment>
            {playMusic && (
                <Container>
                    <audio
                        src={musicUrl}
                        onEnded={handleNextMusic}
                        ref={audio}
                    ></audio>
                    <ContainerLeft>
                        <ImageMusic
                            src={limitSize(playMusic.payload.picUrl, {
                                param: "50y50",
                            })}
                        />
                        <MusicInformation>
                            <MusicName>{playMusic.payload.name}</MusicName>
                            <Typography
                                sx={{
                                    padding: 0,
                                    margin: "0.187rem 0 0 0 ",
                                    fontSize: "0.75rem",
                                    lineHeight: "1rem",
                                    color: "rgb(180,180,180)",
                                }}
                            >
                                {playMusic.payload.auth.map((item, index) =>
                                    index ===
                                    playMusic.payload.auth.length - 1 ? (
                                        <Link key={index}>{item.name}</Link>
                                    ) : (
                                        <span key={index}>
                                            <Link>{item.name}</Link>
                                            <span
                                                style={{
                                                    color: "rgb(25,115,205)",
                                                    margin: "3px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                ,
                                            </span>
                                        </span>
                                    )
                                )}
                            </Typography>
                        </MusicInformation>
                    </ContainerLeft>
                    <ContainerMid>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: -1,
                                margin: 0,
                            }}
                        >
                            <IconButton
                                aria-label="previous song"
                                onClick={handleLastMusic}
                            >
                                <FastRewindRounded
                                    fontSize="large"
                                    htmlColor={mainIconColor}
                                />
                            </IconButton>
                            <IconButton
                                aria-label={playMusic.status ? "play" : "pause"}
                                onClick={() => {
                                    dispatch(setMusicStatus());
                                }}
                            >
                                {!playMusic.status ? (
                                    <PlayArrowRounded
                                        sx={{ fontSize: "3rem" }}
                                        htmlColor={mainIconColor}
                                    />
                                ) : (
                                    <PauseRounded
                                        sx={{ fontSize: "3rem" }}
                                        htmlColor={mainIconColor}
                                    />
                                )}
                            </IconButton>
                            <IconButton
                                aria-label="next song"
                                onClick={handleNextMusic}
                            >
                                <FastForwardRounded
                                    fontSize="large"
                                    htmlColor={mainIconColor}
                                />
                            </IconButton>
                        </Box>
                    </ContainerMid>
                    <ContainerEnd>
                        <IconButton color="secondary" aria-label="add an alarm">
                            <Favorite />
                        </IconButton>
                        <IconButton onClick={getPlayList}>
                            <QueueMusicIcon />
                        </IconButton>
                        <Stack
                            spacing={2}
                            direction="row"
                            sx={{ mb: 1, px: 1, margin: "0" }}
                            alignItems="center"
                        >
                            <VolumeDownRounded htmlColor={lightIconColor} />
                            <Slider
                                aria-label="Volume"
                                defaultValue={30}
                                sx={{
                                    width: "70px",
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "#fff"
                                            : "rgba(0,0,0,0.87)",
                                    "& .MuiSlider-track": {
                                        border: "none",
                                    },
                                    "& .MuiSlider-thumb": {
                                        width: 10,
                                        height: 10,
                                        backgroundColor: "#fff",
                                        "&:before": {
                                            boxShadow:
                                                "0 4px 8px rgba(0,0,0,0.4)",
                                        },
                                        "&:hover, &.Mui-focusVisible, &.Mui-active":
                                            {
                                                boxShadow: "none",
                                            },
                                    },
                                }}
                            />
                            <VolumeUpRounded htmlColor={lightIconColor} />
                        </Stack>
                        <IconButton>
                            <KeyboardControlKeyIcon />
                        </IconButton>
                    </ContainerEnd>
                </Container>
            )}
        </React.Fragment>
    );
};

export default Bar;
