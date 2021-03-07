export const calculateTime = (total, start) => {
    const startMilliseconds = new Date(start).getTime();
    return total + (Date.now() - startMilliseconds);
};

export const formatTime = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / (1000 * 60 * 60)) % 24)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
};
