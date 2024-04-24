import axios from "axios";

export const bookmarkApi = async (token,groupID) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.post(`${URL}/bookmark/${groupID}`,{},
      {
        headers: {
          token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
