import axios from "axios";

export const EditApi = async (token,postID) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await axios.post(`${URL}/edit/${postID}`,{},
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
