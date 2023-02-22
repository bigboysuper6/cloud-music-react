const limitSize = (imageUrl, size) => {
    let params = "?";
    for (let key in size) {
        if (params[params.length - 1] !== "?") {
            params += "&";
        }
        params = params + key + "=" + size[key];
    }
    let result = imageUrl + params;
    // console.log(result);
    return result;
};
// limitSize("http://", { param: "200y200", y: 200 });
export default limitSize;
