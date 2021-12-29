const API_ENDPOINT =
    'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const api = {
    fetchCats: async (keyword) => {
        try {
            const res = await fetch(
                `${API_ENDPOINT}/api/cats/search?q=${keyword}`
            );

            if (!res.ok) {
                throw new Error(res.status);
            }
            return await res.json();
        } catch (e) {
            throw new Error(e.message);
        }
    },

    fetchRandomCats: async () => {
        try {
            const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);

            if (!res.ok) {
                throw new Error('Error occured on fetchRandomCats');
            }
            return await res.json();
        } catch (e) {
            throw new Error(e.message);
        }
    },
};

export default api;
