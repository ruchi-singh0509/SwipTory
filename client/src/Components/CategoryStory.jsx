import React, { useState, useEffect } from "react";
import storypopupStyle from "../styles/storypopup.module.css";
import { likeApi } from "../api/likeapi";
import { bookmarkApi } from "../api/bookmarkApi";
import storyclose from "../assets/logos/cross.png";
import previous from "../assets/logos/prev.png";
import next from "../assets/logos/next.png";
import link from "../assets/logos/send.png";
import likeicon from "../assets/logos/like.png";
import bookmarkicon from "../assets/logos/bookmark.png";
import Toast from "./Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import likedIcon from "../assets/logos/clicked-like.png";
import bookmarkedIcon from "../assets/logos/clicked-book.png"

export default function Categories({ data }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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

  const [likeCount, setLikeCount] = useState(data[currentSlideIndex].likeCount);
  const [isLiked, setLiked] = useState(false);

  const likeAction = async () => {
    const token =
      localStorage.getItem("loginToken") ||
      localStorage.getItem("registerToken");
      const postLikeID = data[currentSlideIndex]._id;
    try {
      const likePost = await likeApi(token, postLikeID);
      console.log(likePost.data);
      setLikeCount(likePost.data.likeCount);
      return likePost;
    } catch (err) {
      console.log(err);
      toast.error("Something is Wrong");
    }
  };

  const handleLike = () => {
    likeAction();
    setLiked(!isLiked);
  };
  console.log(data)

  const [postBookmarked,setIsPostBookmarked] = useState(false)
  const bookMarkAction = async () => {
    const token =
      localStorage.getItem("loginToken") ||
      localStorage.getItem("registerToken");
      const groupBookMark = data[currentSlideIndex]._id;
      console.log(groupBookMark)
    try {
      const bookmark = await bookmarkApi(token, groupBookMark);
      console.log(bookmark)
      return bookmark;
    } catch (err) {
      console.log(err);
      toast.error("Something is wrong")
    }
  };

  const handleBookmark=()=>{
    bookMarkAction();
    setIsPostBookmarked(!postBookmarked)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy URL");
    }
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
        ></img>
        <img
          src={next}
          width={40}
          height={40}
          className={storypopupStyle.next}
          onClick={showNextImage}
          alt="Next"
        ></img>
      </div>

      <div className={storypopupStyle.storyContainer}>
        <div className={storypopupStyle.options}>
          <img
            src={storyclose}
            /* onClick={closeStory} */
            width={18}
            height={18}
            className={storypopupStyle.closebtn}
            alt="Close"
          ></img>
          <img
            src={link}
            onClick={copyToClipboard}
            width={18}
            height={18}
            className={storypopupStyle.link}
            alt="Link"
          ></img>
        </div>

        <div className={storypopupStyle.details}>
          <h2 className={storypopupStyle.heading}>
            {data[currentSlideIndex]?.heading}
          </h2>
          <p className={storypopupStyle.description}>
            {data[currentSlideIndex]?.description}
          </p>
          <div className={storypopupStyle.postAction}>
          <img
              src={postBookmarked ? bookmarkedIcon : bookmarkicon}
              onClick={handleBookmark}
              className={`${storypopupStyle.bookmarkbtn} ${postBookmarked ? 'bookmarked' :''}`}
              alt="Bookmark"
            ></img>
            <img
              src={isLiked ? likedIcon : likeicon}
              onClick={handleLike}
              className={`${storypopupStyle.likebtn} ${isLiked ? 'liked' : ''}`}
              alt="Like"
            ></img>
            <h3 className={storypopupStyle.likeCount}>
              {likeCount}
            </h3>
          </div>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={storypopupStyle.storyItem}
            style={{
              display: index === currentSlideIndex ? "block" : "none",
            }}
          >
            <img
              className={storypopupStyle.images}
              src={item.images}
              alt={`Story ${index} - Image ${currentSlideIndex}`}
              style={{
                display: index === currentSlideIndex ? "block" : "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
