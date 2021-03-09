export const addLog = (list, newLog) => {
    if (!newLog) return list;

    const index = list.findIndex((log) => log.logID === newLog.logID);

    if (index === -1) {
        list.unshift(newLog);
    } else {
        list[index] = newLog;
    }

    return list;
};

export const uniqueLogs = (oldList, newList) => {
    const duplicatedList = [...newList, ...oldList];

    const result = [];
    const map = new Map();

    for (const log of duplicatedList) {
        if (!map.has(log.logID)) {
            map.set(log.logID, true);
            result.push(log);
        }
    }

    return result;
};
