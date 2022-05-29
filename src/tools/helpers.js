const getRandomId = () => Math.random().toString(32).slice(2);

const formattedTravelDate = (start, end) => {
    const first = new Date(start);
    const second = new Date(end);
    const formattedStart = `${("0" + first.getHours()).slice(-2)}:${(
        "0" + first.getMinutes()
    ).slice(-2)}`;
    const formattedEnd = `${("0" + second.getHours()).slice(-2)}:${(
        "0" + second.getMinutes()
    ).slice(-2)}`;
    return formattedStart + "-" + formattedEnd;
};

const formattedTravelTime = (start, end) => {
    let first = new Date(start);
    let second = new Date(end);
    const diff = second - first;
    const diffwithoutTimeZone = diff + first.getTimezoneOffset() * 60000;
    const timeInstance = new Date(diffwithoutTimeZone);
    console.log(diff);
    return {
        time: diff,
        caption: `${timeInstance.getHours()}ч ${timeInstance.getMinutes()}мин`,
    };
};

const getLegsTotalTime = (array) => {
    const segments = array.flat();
    return segments.reduce((prev, item) => {
        return prev + item.travelTime.time;
    }, 0);
};

export {
    getRandomId,
    formattedTravelDate,
    formattedTravelTime,
    getLegsTotalTime,
};
