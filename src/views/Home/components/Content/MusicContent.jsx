import React from "react";
import MusicCard from "./components/MusicCard";
import DayMusicCard from "./components/DayMusicCard";
import { personalized } from "../../../../api/base";
import { recommendResource } from "../../../../api/recommend";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const MusicContent = (props) => {
    const [list, setList] = React.useState([]);
    const daySongsState = useSelector((state) => state.recommendSongs.value);
    const { status: usrState } = useSelector((state) => state.auth.value);
    React.useEffect(() => {
        getList();
    }, []);
    function getDayRcmCard() {
        if (usrState) {
            console.log("daySongsState1", daySongsState);
            return (
                daySongsState && <DayMusicCard daySongsState={daySongsState} />
            );
        } else return null;
    }
    async function getList() {
        if (!usrState) {
            const { data } = await personalized({ limit: 10 });
            console.log("推荐的十个歌单", data);
            setList(data.result);
        } else {
            const { data: usrData } = await recommendResource();
            console.log("每日推荐歌单:", usrData.recommend);
            let daysongs;
            if (usrData.recommend.length > 8) {
                daysongs = usrData.recommend.slice(0, 8);
                console.log("裁剪为 8 首", daysongs);
            } else if (usrData.recommend.length < 8) {
                const { data } = await personalized(1);
                console.log("获取一个推荐歌单", data.result);
                daysongs = [...usrData.recommend, ...data.result];
                console.log("新获取的八首推荐", daysongs);
            } else daysongs = usrData.recommend;
            setList(daysongs);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginBottom: "5rem",
            }}
        >
            {getDayRcmCard()}
            {list.map((item, index) => (
                <MusicCard key={index} list={item} />
            ))}
        </Box>
    );
};

export default MusicContent;
