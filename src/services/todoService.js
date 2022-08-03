import axiosClient from "./axiosClient";

const fetchTodos = async (userId, pagination) => {
  try {
    const { limit, page } = pagination ?? {};
    const res = await axiosClient.get(`user/${userId}/todos`, {
      params: { limit, page },
    });
    console.log("[getTodos]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const insertTodo = async (userId, payload = {}) => {
  try {
    const res = await axiosClient.post(`user/${userId}/todos`, payload);
    console.log("[insertTodo]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (userId, todoId) => {
  try {
    const res = await axiosClient.delete(`user/${userId}/todos/${todoId}`);
    console.log("[deleteTodo]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (userId, payload = {}) => {
  try {
    const res = await axiosClient.put(
      `user/${userId}/todos/${payload.id}`,
      payload
    );
    console.log("[updateTodo]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTodos, insertTodo, deleteTodo, updateTodo };
