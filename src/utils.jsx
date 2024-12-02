import axios from 'axios';

const users_url = 'https://jsonplaceholder.typicode.com/users';
const posts_url = 'https://jsonplaceholder.typicode.com/posts';
const todos_url = 'https://jsonplaceholder.typicode.com/todos';

const getAllUsers = async () => {
    return await axios.get(users_url);
};

const getUserById = async (id) => {
    return await axios.get(`${users_url}/${id}`);
};

const updateUser = async (userId, obj) => {
    return await axios.patch(`${users_url}/${userId}`, obj);
};

const addNewUser = async (obj) => {
    return await axios.post(users_url, obj);
}

const deleteUser = async (userId) => {
    return await axios.delete(`${users_url}/${userId}`)
}

const getAllPosts = async () => {
    return await axios.get(posts_url);
};

const getPostsByUserId = async (userId) => {
    return await axios.get(`${posts_url}?userId=${userId}`);
};

const getAllTodos = async () => {
    return await axios.get(todos_url);
};

const getTodosByUserId = async (userId) => {
    return await axios.get(`${todos_url}?userId=${userId}`);
};

const updateTodos = async (todoId, obj) => {
    return await axios.patch(`${todos_url}/${todoId}`, obj);
};

const addNewTodo = async (obj) => {
    return await axios.post(todos_url, obj)
};

const addNewPost = async (obj) => {
    return await axios.post(posts_url, obj)
};



export {
    getAllUsers, getUserById, getAllPosts, getPostsByUserId, getAllTodos, getTodosByUserId, updateUser, deleteUser, updateTodos, addNewTodo, addNewPost, addNewUser
};