import axios from "axios";

export const postStory = async (storyData, token) => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const story = await axios.post(`${URL}/post`, storyData, {
      headers: { token },
    });

    return story.data;
  } catch (err) {
    console.log(err);
  }
};
