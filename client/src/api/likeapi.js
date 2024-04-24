import axios from "axios";

export const likeApi = async (token, postID) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const like = await axios.post(
      `${URL}/like/${postID}`,
      {},
      {
        headers: { token },
      }
    );
    return like;
  } catch (err) {
    console.error(err);
  }
};
