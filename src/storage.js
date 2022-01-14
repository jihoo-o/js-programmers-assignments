export const storage = {
    getItem: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : [];
        } catch {
            return [];
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore
        }
    },
};
