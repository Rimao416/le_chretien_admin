import { API } from "../config";
API.defaults.withCredentials = true;
export const fetchData = async (url) => {
    try {
      const response = await API.get(url);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return error.response.data;
    }
  };