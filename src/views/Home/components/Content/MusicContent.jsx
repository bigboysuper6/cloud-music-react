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
        try {
            if (!usrState) {
                const response = await personalized({ limit: 10 });
                if (response?.data?.result) {
                    console.log("推荐的十个歌单", response.data);
                    setList(response.data.result);
                } else {
                    console.error("Error fetching personalized data:", response);
                    setList([]);
                }
            } else {
                const response = await recommendResource();
                const usrData = response?.data;
                
                if (!usrData?.recommend) {
                    console.error("Error fetching recommended resources:", response);
                    setList([]);
                    return;
                }

                console.log("每日推荐歌单:", usrData.recommend);
                let daysongs;
                
                if (usrData.recommend.length > 8) {
                    daysongs = usrData.recommend.slice(0, 8);
                    console.log("裁剪为 8 首", daysongs);
                } else if (usrData.recommend.length < 8) {
                    const personalizedResponse = await personalized(1);
                    if (personalizedResponse?.data?.result) {
                        console.log("获取一个推荐歌单", personalizedResponse.data.result);
                        daysongs = [...usrData.recommend, ...personalizedResponse.data.result];
                        console.log("新获取的八首推荐", daysongs);
                    } else {
                        daysongs = usrData.recommend;
                    }
                } else {
                    daysongs = usrData.recommend;
                }
                setList(daysongs);
            }
        } catch (error) {
            console.error("Error in getList:", error);
            setList([]);
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