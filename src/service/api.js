const END_POINT =
    'https://cors-anywhere.herokuapp.com/https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev';

export const api = {
    requestProducts: async () => {
        try {
            const res = await fetch(`${END_POINT}/products`);
            if (!res.ok) {
                // throw new Error('API 통신 실패');
            }
            return await res.json();
        } catch (e) {
            console.error(e.message);
        }
    },
    requestProduct: async () => {},
};
