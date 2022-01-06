const API_END_POINT =
    'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const api = {
    getNodes: async (nodeId) => {
        try {
            const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);
            if (!res.ok) {
                throw new Error('서버 에러');
            }
            return await res.json();
        } catch (e) {
            console.error(e.message);
        }
    },
};

export default api;
