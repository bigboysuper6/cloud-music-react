import React from "react";
import MusicList from "../../../../components/common/MusicList";
import { playlistTrackAll } from "../../../../api/palylist";
import { Box } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMusicListRedux } from "../../../../app/Slices/music";
import { default as Pagination } from "./components/Pagination";
import paginate from "../../../../utils/paginate";

const MusicListContent = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [musiclist, setMusicList] = React.useState([]);
    const [showList, setShowList] = React.useState([]);
    const daySongsState = useSelector((state) => state.recommendSongs.value);
    const pageSize = 20;
    React.useEffect(() => {
        getMusicList();
    }, []);

    React.useEffect(() => {
        changeShowList(1);
    }, [musiclist]);

    React.useEffect(() => {
        if (location.pathname === "/daysongs" && daySongsState) {
            dispatch(setMusicListRedux(daySongsState.payload.dailySongs));
        }
    }, [daySongsState, dispatch, location.pathname]);

    const changeShowList = (currentPage) => {
        let showData = paginate(musiclist, currentPage, pageSize);
        setShowList(showData);
        console.log("showData:", showData, musiclist.length);
    };

    async function getMusicList() {
        if (location.pathname !== "/daysongs") {
            const match = matchPath(
                { path: "/songlist/:id" },
                location.pathname
            );
            let { id } = match.params;
            const { data } = await playlistTrackAll({ id: id });
            console.log("歌单所有音乐信息", data);
            setMusicList(data.songs);
            dispatch(setMusicListRedux(data.songs));
        }
    }

    return (
        <Box marginBottom={"6rem"}>
            {location.pathname === "/daysongs" && daySongsState && (
                <Box>
                    {daySongsState.payload.dailySongs.map((item, index) => (
                        <MusicList key={index} songslist={item} index={index} />
                    ))}
                </Box>
            )}
            {location.pathname !== "/daysongs" && (
                <Box>
                    {showList.map((item, index) => (
                        <MusicList key={index} songslist={item} index={index} />
                    ))}
                </Box>
            )}
            {Math.ceil(musiclist.length / pageSize) > 1 && (
                <Pagination
                    count={Math.ceil(musiclist.length / pageSize)}
                    onChange={changeShowList}
                />
            )}
        </Box>
    );
};

export default MusicListContent;
