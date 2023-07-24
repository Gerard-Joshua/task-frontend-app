import http from '../http-common';

const getAll = () => {
    return http.get(`/task`);
}

const get = id => {
    return http.get(`/task/${id}`);
}

const create = data => {
    return http.post(`/task`, data);
}

const update = (id, data) => {
    return http.put(`/task/${id}`, data);
}

const remove = id => {
    return http.delete(`/task/${id}`);
}

const TaskService = {
    getAll,
    get,
    create,
    update,
    remove
}

export default TaskService;
