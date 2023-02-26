import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { ContactSupportOutlined, Favorite, Layers } from "@mui/icons-material";
import { Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setPlayMusic,
    setMusicIndex,
    setPlayList,
} from "../../app/Slices/music/index";
import store from "../../app/store";
import limitSize from "../../utils/limitSize";
import hiddenText from "../../utils/hiddenText";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
    width: inherit;
    border-radius: 0.625rem;
    min-height: ${(props) => {
        console.log("hiddenImage", props.hiddenImage);
        return props.hiddenImage ? "50px" : "80px";
    }};
    display: flex;
    justify-content: space-between;
    &:hover {
        background-color: rgb(60, 60, 60);
    }
    background-color: ${(props) => {
        return props.select ? "rgb(60, 60, 60)" : "";
    }};
`;

const ContainerLeft = styled.div`
    width: 15%;
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
    margin: ${(props) => {
        return props.hiddenImage ? "0 0 0 1rem" : "0";
    }};
`;

const ContainerMid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.625rem;
`;

const ContainerEnd = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;

const MusicList = (props) => {
    const songlist = useSelector((state) => state.music.value.musicList);
    const thePlayMusic = useSelector((state) => state.music.value.playMusic);

    // change playmusic background
    const [selectMusic, setSelectMusic] = useState(false);
    useEffect(() => {
        if (thePlayMusic?.payload?.id === props.songslist.id) {
            setSelectMusic(true);
        } else {
            setSelectMusic(false);
        }
    }, [thePlayMusic?.payload?.id, props.songslist.id]);

    const dispatch = useDispatch();
    const hiddenImage = props.hiddenImage === true;
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
    function playMusic() {
        const MusicData = {
            picUrl: props.songslist.al.picUrl,
            id: props.songslist.id,
            auth: props.songslist.ar,
            name: props.songslist.name,
        };
        const index = songlist.payload.indexOf(props.songslist);
        dispatch(setPlayMusic(MusicData));
        dispatch(setPlayList(songlist));
        dispatch(setMusicIndex(index));
    }

    return (
        <Container
            select={selectMusic}
            hiddenImage={hiddenImage}
            onDoubleClick={playMusic}
        >
            <ContainerLeft>
                {!hiddenImage && (
                    <ImageMusic
                        src={limitSize(props.songslist.al.picUrl, {
                            param: "50y50",
                        })}
                    />
                )}
                <MusicInformation hiddenImage={hiddenImage}>
                    <Typography
                        gutterBottom
                        sx={Object.assign(
                            {
                                padding: 0,
                                margin: 0,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                lineHeight: "1rem",
                                color: "rgb(180,180,180)",
                            },
                            hiddenText(1)
                        )}
                        component="div"
                    >
                        {props.songslist.name}
                    </Typography>
                    <Typography
                        sx={Object.assign(
                            {
                                padding: 0,
                                margin: "0.187rem 0 0 0 ",
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                                color: "rgb(180,180,180)",
                            },
                            hiddenText(1)
                        )}
                    >
                        {props.songslist.ar.map((item, index) =>
                            index === props.songslist.ar.length - 1 ? (
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
                <Typography
                    gutterBottom
                    sx={{
                        padding: 0,
                        margin: 0,
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        lineHeight: "1rem",
                        color: "rgb(180,180,180)",
                    }}
                    component="div"
                >
                    {props.songslist.al.name}
                </Typography>
            </ContainerMid>
            <ContainerEnd>
                {!hiddenImage && (
                    <IconButton color="secondary" aria-label="add an alarm">
                        <Favorite></Favorite>
                    </IconButton>
                )}
                <Typography
                    gutterBottom
                    sx={{
                        margin: 0,
                        marginRight: "1rem",
                        padding: 0,
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        lineHeight: "1rem",
                        color: "rgb(180,180,180)",
                    }}
                    component="div"
                >
                    {timeChange()}
                </Typography>
            </ContainerEnd>
        </Container>
    );
};

export default MusicList;
