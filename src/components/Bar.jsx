import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Favorite } from "@mui/icons-material";
import { Link, Box } from "@mui/material";
import * as React from "react";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import LoopIcon from "@mui/icons-material/Loop";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
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
import limitSize from "../utils/limitSize";
import playMethod from "../utils/playMethod";
import { setPlayMusic, setMusicIndex } from "../app/Slices/music";
import { songUrl } from "../api/base";
import PlayListMenu from "./PlayListMenu";

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
    background-color: rgb(45, 45, 45);
    z-index: 1;
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

const playMethodList = [
    { name: "loop", icon: <LoopIcon /> },
    { name: "repeat", icon: <RepeatOneIcon /> },
    { name: "shuffle", icon: <ShuffleIcon /> },
    { name: "playlist", icon: <PlaylistPlayIcon /> },
];

const Bar = (props) => {
    const playMusic = useSelector((state) => state.music.value.playMusic);
    const playList = useSelector((state) => state.music.value.playList);
    const dispatch = useDispatch();
    const audio = React.useRef();
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);
    const [musicUrl, setMusicUrl] = React.useState("");
    const [playMethodIndex, setPlayMethodIndex] = React.useState(0);
    const [musicData, setMusicData] = React.useState();
    const [status, setStatus] = React.useState();
    const [playedList, setPlayedList] = React.useState([]);
    const [showState, setShowState] = React.useState(false);

    React.useEffect(() => {
        if (showState) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "scroll";
    }, [showState]);
    React.useEffect(() => {
        getPlayMusic();
        setStatus(true);
    }, [playMusic]);

    async function getPlayMusic() {
        if (playMusic)
            if (playMusic.payload.id !== "") {
                console.log("playMusic", playMusic);
                const { data: musicData } = await songUrl({
                    id: playMusic.payload.id,
                    level: "exhigh",
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
        setShowState((showState) => {
            return !showState;
        });
    }

    function handleLastMusic() {
        let index = playMusic.index.payload;
        let thePlayList = playList.payload.payload;
        let playMethodName = playMethodList[playMethodIndex].name;
        console.log("当前音乐索引", index.payload);
        let { result: nextIndex, playedIndex } = playMethod[
            playMethodName.includes("shuffle") ? "shuffleUp" : "Up"
        ](index, thePlayList.length, playedList);
        console.log("当前播放列表", playList.payload.payload);
        if (playedIndex !== undefined) setPlayedList(playedIndex);
        const music = playList.payload.payload[nextIndex];
        const MusicData = {
            picUrl: music.al.picUrl,
            id: music.id,
            auth: music.ar,
            name: music.name,
        };
        console.log("前一个音乐", MusicData);
        dispatch(setPlayMusic(MusicData));
        dispatch(setMusicIndex(nextIndex));
    }
    function handleNextMusic(click) {
        console.log(playMusic);
        let index = playMusic.index.payload;
        let thePlayList = playList.payload.payload;
        let playMethodName = playMethodList[playMethodIndex].name;
        if (!click && playMethodName === "repeat") {
            audio.current.play();
            setStatus(true);
        } else if (
            !click &&
            playMethodName === "playlist" &&
            index === thePlayList.length - 1
        ) {
            setStatus(false);
        } else {
            console.log("1234yes");
            console.log("当前音乐索引", index);
            let { result: nextIndex, playedIndex } = playMethod[
                playMethodName.includes("shuffle") ? "shuffleDown" : "Down"
            ](index, thePlayList.length, playedList);
            if (playedIndex !== undefined) setPlayedList(playedIndex);
            console.log("当前播放列表", thePlayList);
            const music = thePlayList[nextIndex];
            const MusicData = {
                picUrl: music.al.picUrl,
                id: music.id,
                auth: music.ar,
                name: music.name,
            };
            console.log("前一个音乐", MusicData);
            dispatch(setPlayMusic(MusicData));
            dispatch(setMusicIndex(nextIndex));
        }
    }

    function handlePlayMethod(index) {
        let newIndex = index === playMethodList.length - 1 ? 0 : index + 1;
        if (newIndex === 2) {
            let playMusicIndex = playMusic.index.payload;
            let newPlayedList = [];
            newPlayedList.push(playMusicIndex);
            setPlayedList(newPlayedList);
        }
        console.log(index, newIndex);
        setPlayMethodIndex(newIndex);
    }

    function handleVolume(event, value) {
        audio.current.volume = value / 100;
        console.log("音量:", event.target.value, value, audio.current.volume);
    }

    function handlePlayMusic() {
        if (!status) {
            audio.current.play();
            setStatus(true);
        } else {
            audio.current.pause();
            setStatus(false);
        }
    }
    return (
        <>
            {playMusic && (
                <div>
                    <Container>
                        <audio
                            src={musicUrl}
                            onEnded={() => handleNextMusic(false)}
                            ref={audio}
                            autoPlay
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
                                <IconButton onClick={handlePlayMusic}>
                                    {!status ? (
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
                                    onClick={() => handleNextMusic(true)}
                                >
                                    <FastForwardRounded
                                        fontSize="large"
                                        htmlColor={mainIconColor}
                                    />
                                </IconButton>
                            </Box>
                        </ContainerMid>
                        <ContainerEnd>
                            <IconButton
                                color="secondary"
                                aria-label="add an alarm"
                            >
                                <Favorite />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    handlePlayMethod(playMethodIndex)
                                }
                            >
                                {playMethodList[playMethodIndex].icon}
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
                                    onChange={(event, value) =>
                                        handleVolume(event, value)
                                    }
                                    aria-label="Volume"
                                    defaultValue={20}
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
                    <PlayListMenu showState={showState} />
                </div>
            )}
        </>
    );
};

export default Bar;
