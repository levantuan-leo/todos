import axiosClient from "./axiosClient";
import { auth } from "./authService";

const fetchTodos = async (pagination) => {
  try {
    const { limit, page } = pagination ?? {};
    const res = await axiosClient.get(`user/${auth.currentUser.uid}/todos`, {
      params: { limit, page },
    });
    console.log("[getTodos]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const insertTodo = async (payload = {}) => {
  try {
    const res = await axiosClient.post(
      `user/${auth.currentUser.uid}/todos`,
      payload
    );
    console.log("[insertTodo]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (payload = {}) => {
  try {
    const res = await axiosClient.put(
      `user/${auth.currentUser.uid}/todos/${payload.id}`,
      payload
    );
    console.log("[updateTodo]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTodos, insertTodo, updateTodo };
