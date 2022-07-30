import axiosClient from "./axiosClient";

const fetchTodos = async () => {
  try {
    const res = await axiosClient.get("/todos");
    console.log("[fetchTodos]: ", res);
    //---------------------
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const insertTodo = async (payload = {}) => {
  try {
    const res = await axiosClient.post("/todos/add", payload);
    if (res.status === 201) res.todos = payload;
    console.log("[insertTodo]: ", res);
    //---------------------
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (payload = {}) => {
  try {
    const res = await axiosClient.put("/todos/update", payload);
    if (res.status === 204) res.todos = payload;
    console.log("[updateTodo]: ", res);
    //---------------------
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTodos, insertTodo, updateTodo };
