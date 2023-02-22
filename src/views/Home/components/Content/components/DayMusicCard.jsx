import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import limitSize from "../../../../../utils/limitSize";
export default function DayMusicCard(props) {
    const rotate = keyframes`
  from {
    margin-Top: 0px;
  }

  to {
    margin-Top: -125px;
  }
`;
    const DayRcmContainer = styled.div`
        position: relative;
        width: 100%;
        height: 238.5px;
    `;
    const DayRcmImg = styled.img`
    width: 100%;
    animation: ${rotate} 15s linear infinite;
    animation-direction: alternate;
    z-index=-1;
    filter: blur(0.5px);
  `;
    const FontContainer = styled.div`
    z-index=0;
  `;
    const DayRcmFont = styled.p`
        position: absolute;
        margin: 0;
        left: 10px;
        bottom: 0px;
        color: rgb(180, 180, 180);
        font-weight: bold;
        font-size: 40px;
    `;
    return (
        <Box
            sx={{
                width: "37.4%",
                display: "flex ",
                flexDirection: "column",
            }}
        >
            <Card
                sx={{
                    backgroundColor: "rgb(37,37,37)",
                    maxWidth: "100%",
                    borderRadius: "0.625rem",
                }}
            >
                <DayRcmContainer>
                    <Link to={`/daysongs`}>
                        <DayRcmImg
                            src={limitSize(
                                props.daySongsState.payload.dailySongs[0].al
                                    .picUrl,
                                { param: "300y300" }
                            )}
                            alt="每日推荐歌曲图片"
                        />
                        <FontContainer>
                            <DayRcmFont>每日推荐</DayRcmFont>
                        </FontContainer>
                    </Link>
                </DayRcmContainer>
            </Card>
        </Box>
    );
}
