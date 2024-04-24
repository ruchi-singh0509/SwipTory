import React, { useEffect, useState } from "react";
import { fetchUserBookMark } from "../api/fetchUserBookMarks";
import { jwtDecode } from "jwt-decode";
import storyStyle from "../styles/story.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import storypopupStyle from "../styles/storypopup.module.css";
import BookmarkStory from "./BookmarkStory";

export default function BookmarkComponent() {
  const loginToken = localStorage.getItem("loginToken");
  const registerToken = localStorage.getItem("registerToken");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!loginToken || !registerToken) {
          setError(true);
        }
        let user_id;
        if (loginToken) {
          const decodedLoginToken = jwtDecode(loginToken);
          user_id = decodedLoginToken._id;
        } else if (registerToken) {
          const decodedRegisterToken = jwtDecode(registerToken);
          user_id = decodedRegisterToken._id;
        }
        const payload = await fetchUserBookMark(
          loginToken || registerToken,
          user_id
        );
        console.log(payload.bookmarks);
        setData(payload.bookmarks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookmarks();
  }, []);

  const extractingPost = data.map((item) => item.post.posts);
  console.log(extractingPost);

  return (
    <div>
      <h1 className={storyStyle.pageheading}>Your Bookmarks</h1>
      {extractingPost.map((postsArray, index) => (
        <Popup
          key={index}
          trigger={
            <div className={storyStyle.story}>
              {postsArray.length > 0 && (
                <div className={storyStyle.details}>
                  <h3 className={storyStyle.heading}>
                    {postsArray[0].heading}
                  </h3>
                  <p className={storyStyle.description}>
                    {postsArray[0].description}
                  </p>
                </div>
              )}
              {postsArray.length > 0 && (
                <img
                  src={postsArray[0].images}
                  className={storyStyle.image}
                  alt={postsArray[0].heading}
                />
              )}
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
            <BookmarkStory data={postsArray} />
          ) : (
            <p>No stories available</p>
          )}
        </div>
        </Popup>
      ))}
    </div>
  );
}