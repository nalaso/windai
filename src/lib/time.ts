export const timeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHr = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHr / 24);

    if (diffInSec < 60) {
        return `${diffInSec} sec ago`;
    } else if (diffInMin < 60) {
        return `${diffInMin} min ago`;
    } else if (diffInHr < 24) {
        return `${diffInHr} hr ago`;
    } else {
        return date.toLocaleDateString(); // Returns the date in the local format
    }
};