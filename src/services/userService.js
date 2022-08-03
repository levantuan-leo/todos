import axiosClient from "./axiosClient";

const checkUser = async (email) => {
  try {
    const res = await axiosClient.get(`user?email=${email}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (userId) => {
  try {
    const res = await axiosClient.get(`user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (payload) => {
  try {
    const res = await axiosClient.post(`user`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { checkUser, fetchUser, addUser };
