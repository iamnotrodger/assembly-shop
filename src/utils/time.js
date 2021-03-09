export const formatTime = (time) => {
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor((time / (1000 * 60 * 60)) % 24)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
};

export const calculateTime = (total, start) => {
    const startMilliseconds = new Date(start).getTime();
    return total + (Date.now() - startMilliseconds);
};

export const calculateTotal = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return endDate - startDate;
};

export const formatAMPM = (time) => {
    if (!time) return null;

    const date = new Date(time);
    let hour = date.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    let minute = `0${date.getMinutes()}`.slice(-2);

    return `${hour}:${minute} ${ampm}`;
};
