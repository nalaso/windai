export const getLocalStorageItem = (key: string, defaultValue: string): string => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};