import React, { useEffect, useState } from "react";
import { fetchCategoryApi } from "../api/fetchCategory";
import storyStyle from "../styles/story.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import storypopupStyle from "../styles/storypopup.module.css";
import CategoryStory from "./CategoryStory";

export default function FoodStories() {
  const [data, setData] = useState([]);
  const [storyCount, setStoryCount] = useState(1); // State variable to keep track of the number of stories to display

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const payload = await fetchCategoryApi("movies");
        setData(payload.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);
  const handleSeeMore = () => {
    setStoryCount((prevCount) => prevCount + 1);
  };


  return (
    <div>
      <h1 className={storyStyle.pageheading}>Top Stories about Movies</h1>
      <Popup
        trigger={
          <div className={storyStyle.story}>
            <div className={storyStyle.details}>
              <h3 className={storyStyle.heading}>
                {data.length > 0 && data[0].heading}
              </h3>
              <p className={storyStyle.description}>
                {data.length > 0 && data[0].description}
              </p>
            </div>
            <img
              src={data.length > 0 && data[0].images}
              className={storyStyle.image}
            />
          </div>
        }
        modal
        nested
        contentStyle={{
          width: "49rem",
          height: "37.8rem",
          backgroundColor: "transparent",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
        }}
      >
        <div className={storypopupStyle.storyContainer}>
          {data.length > 0 ? (
            <CategoryStory data={data.slice(0, storyCount)} />
          ) : (
            <p>No stories available</p>
          )}
          <button onClick={handleSeeMore} className={storyStyle.seeMore}>
            See more
          </button>
        </div>
      </Popup>
    </div>
  );
}
