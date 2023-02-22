import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils";
import Radio from "@mui/material/Radio";
import { banner } from "../../../../api/base";
import limitSize from "../../../../utils/limitSize";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Banner = (props) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [images, setImages] = React.useState([]);
    React.useEffect(() => {
        getImage();
    }, []);

    async function getImage() {
        const { data } = await banner();
        console.log("轮播图", data.banners);
        setImages(data.banners);
    }

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const controlProps = (item) => ({
        checked: activeStep === item,
        onChange: () => handleStepChange(item),
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item },
    });

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    marginTop: "25px",
                    marginBottom: "25px",
                    maxWidth: "100%",
                    position: "relative",
                }}
            >
                <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    style={{
                        borderRadius: "10px",
                    }}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div
                            key={step.imageUrl}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: "100%",
                                    display: "block",
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                                src={limitSize(step.imageUrl, {
                                    param: "900y300",
                                })}
                                alt="轮播图图片"
                            />
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "5px",
                        }}
                    >
                        {images.map((step, index) => (
                            <Radio
                                key={step.imageUrl}
                                {...controlProps(index)}
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 10,
                                    },
                                    width: "15px",
                                    height: "10px",
                                    margin: "0px 2px",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default Banner;
