//策略模式
const playMethod = {
    shuffleDown: (index, length, playedIndex) => {
        let result;
        if (
            playedIndex.length === 1 ||
            index === playedIndex[playedIndex.length - 1]
        ) {
            do {
                result = Math.floor(Math.random() * length);
            } while (result === index || playedIndex.indexOf(result) !== -1);
            playedIndex.push(result);
        } else {
            result = playedIndex[playedIndex.indexOf(index) + 1];
        }
        if (playedIndex.length === length) {
            playedIndex = [];
        }
        console.log("随机数", index, result, playedIndex);
        return { result, playedIndex };
    },
    shuffleUp: (index, length, playedIndex) => {
        let result;
        if (playedIndex.length === 1 || index === playedIndex[0]) {
            do {
                result = Math.floor(Math.random() * length);
            } while (result === index || playedIndex.indexOf(result) !== -1);
            playedIndex.unshift(result);
        } else {
            result = playedIndex[playedIndex.indexOf(index) - 1];
        }
        console.log("随机数", index, result, playedIndex);
        return { result, playedIndex };
    },
    Down: (index, length) => {
        if (index === length - 1) return { result: 0 };
        return { result: index + 1 };
    },
    Up: (index, length) => {
        if (index === 0) return { result: length - 1 };
        return { result: index - 1 };
    },
};

export default playMethod;
