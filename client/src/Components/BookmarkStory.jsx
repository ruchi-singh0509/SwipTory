import React, { useState, useEffect } from "react";
import storypopupStyle from "../styles/storypopup.module.css";
import storyclose from "../assets/logos/cross.png";
import previous from "../assets/logos/prev.png";
import next from "../assets/logos/next.png";
import link from "../assets/logos/send.png";
import likeicon from "../assets/logos/like.png";
import bookmarkicon from "../assets/logos/bookmark.png";
import Toast from "./Toast";
import "react-toastify/dist/ReactToastify.css";

export default function BookmarkStory({ data }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  console.log(data);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [data]);

  const showPreviousImage = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <Toast />
      <div className={storypopupStyle.toggle}>
        <img
          src={previous}
          className={storypopupStyle.previous}
          width={40}
          height={40}
          onClick={showPreviousImage}
          alt="Previous"
        />
        <img
          src={next}
          width={40}
          height={40}
          className={storypopupStyle.next}
          onClick={showNextImage}
          alt="Next"
        />
      </div>

      <div className={storypopupStyle.storyContainer}>
      <div className={storypopupStyle.options}>
        <img
          src={storyclose}
          width={18}
          height={18}
          className={storypopupStyle.closebtn}
          alt="Close"
        />
        <img
          src={link}
          width={18}
          height={18}
          className={storypopupStyle.link}
          alt="Link"
        />
      </div>


      <div className={storypopupStyle.details}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{ display: index === currentSlideIndex ? "block" : "none" }}
          >
            <h2 className={storypopupStyle.heading}>{item.heading}</h2>
            <p className={storypopupStyle.description}>{item.description}</p>
            <div className={storypopupStyle.postAction}>
              <img
                src={bookmarkicon}
                className={storypopupStyle.bookmarkbtn}
                alt="Bookmark"
              />
              <img
                src={likeicon}
                className={storypopupStyle.likebtn}
                alt="Like"
              />
            </div>
          </div>
        ))}
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className={storypopupStyle.storyItem}
          style={{ display: index === currentSlideIndex ? "block" : "none" }}
        >
          <img
            className={storypopupStyle.images}
            src={item.images}
            alt={`Story ${index} - Image ${currentSlideIndex}`}
          />
        </div>
      ))}
    </div>
    </div>
  );
}
