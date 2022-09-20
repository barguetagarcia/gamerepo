import http from "../http-common"

class GamerepoDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return http.get(`gamerepo?${by}=${query}&page=${page}`);
    }

    createComment(data) {
        return http.post("/comments", data);
    }

    updateComment(data) {
        return http.put("/comments", data);
    }

    deleteComment(id, userId) {
        return http.delete(`/comments?id=${id}`, {data:{user_id: userId}});
    }

    getPublishers(id) {
        return http.get(`/publishers`);
    }


}

export default new GamerepoDataService();