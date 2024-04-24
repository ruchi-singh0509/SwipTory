import React, { useEffect, useState } from "react";
import { fetchCategoryApi } from "../api/fetchCategory";
import storyStyle from "../styles/story.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import storypopupStyle from "../styles/storypopup.module.css";
import CategoryStory from "./CategoryStory";

export default function FoodStories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFoodApi = async () => {
      try {
        const payload = await fetchCategoryApi("food");
        setData(payload.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFoodApi();
  }, []);


  return (
    <div>
      <h1 className={storyStyle.pageheading}>Top Stories about Food</h1>
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
            <CategoryStory data={data} />
          ) : (
            <p>No stories available</p>
          )}
        </div>
      </Popup>
    </div>
  );
}
