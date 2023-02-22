const paginate = function (data, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
};

export default paginate;
