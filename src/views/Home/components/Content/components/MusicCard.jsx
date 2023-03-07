import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import limitSize from "../../../../../utils/limitSize";

export default function MusicCard({ list }) {
    return (
        <Box
            sx={{
                width: "18.7%",
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
                <Link to={`/songlist/${list.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            width="100%"
                            image={limitSize(list.picUrl, { param: "300y300" })}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Link>
            </Card>
            <CardContent sx={{ padding: 0 }}>
                <Typography
                    gutterBottom
                    sx={{
                        padding: 0,
                        margin: "0.31rem 0 0 0",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        lineHeight: "1rem",
                        color: "rgb(180,180,180)",
                    }}
                    component="div"
                >
                    {list.name}
                </Typography>
                <Typography
                    sx={{
                        padding: 0,
                        margin: "0.1875rem 0 0 0 ",
                        fontSize: "0.625rem",
                        lineHeight: "0.75rem",
                        color: "rgb(180,180,180)",
                    }}
                >
                    {list.copywriter}
                </Typography>
            </CardContent>
        </Box>
    );
}
