const hiddenText = (lines) => {
    return {
        "-webkit-line-clamp": lines + "",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };
};

export default hiddenText;
