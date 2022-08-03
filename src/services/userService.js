import axiosClient from "./axiosClient";
import { auth } from "./authService";

const checkUser = async () => {
  try {
    const res = await axiosClient.get(`user?email=${auth.currentUser.email}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async () => {
  try {
    const res = await axiosClient.get(`user/${auth.currentUser.uid}`);
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
