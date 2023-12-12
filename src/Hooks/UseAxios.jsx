import axios from "axios";
import useAuth from "./UseAuth";

const instance = axios.create({
    baseURL: 'https://online-group-study-server-kohl.vercel.app/api/v1',
    withCredentials: true
  });

const UseAxios = () => {
  const {logoutUser} = useAuth()
  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

 if (error.response.status === 401 || error.response.status === 403 ) {
   logoutUser()
 }
    return Promise.reject(error);
  });
    return instance
};

export default UseAxios;