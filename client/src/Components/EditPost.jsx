import React, { useEffect, useState } from "react";
import getPost from "../api/getPost"
import postStyle from "../styles/postStory.module.css";
import close from "../assets/logos/close.png";
import Toast from "./Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SlideButton() {
  const MAX_SLIDES = 6;

  const [currentSlide, setCurrentSlide] = useState(1);

  const [slides, setSlides] = useState([
    { id: 1, heading: "", description: "", images: "", category: "" },
    { id: 2, heading: "", description: "", images: "", category: "" },
    { id: 3, heading: "", description: "", images: "", category: "" },
  ]);

  const [selectedSlide, setSelectedSlide] = useState(null);
  const [error,setError] = useState(false)

  const handleAddSlide = () => {
    if (slides.length < MAX_SLIDES) {
      setSlides((prevSlides) => [
        ...prevSlides,
        {
          id: prevSlides.length + 1,
          heading: "",
          description: "",
          images: "",
          category: "",
        },
      ]);
      setCurrentSlide(slides.length + 1);
    }
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      const newSlides = slides.filter((_, i) => i !== index);

      //update index of remaining slide
      const updatedSlides = newSlides.map((slide, i) => ({
        ...slide,
        id: i + 1,
      }));

      setSlides(updatedSlides);

      //adjusting current slide to stay within the valid range
      let adjustedCurrentSlide = currentSlide;

      //check if the current slide is beyond the new length of slides
      if (adjustedCurrentSlide >= updatedSlides.length) {
        adjustedCurrentSlide = updatedSlides.length - 1;
      }

      setCurrentSlide(adjustedCurrentSlide);
    }
  };

  const handleInputChange = (e, slideIndex) => {
    const { name, value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide, index) =>
        index + 1 === slideIndex ? { ...slide, [name]: value } : slide
      )
    );
  };

  useEffect(()=>{
    try{
      const fetchPost = async()=>{
        const currentPostData= await getPost()
      }

    }catch(err){
      console.log(err)
    }
  })

  const handlePost = async () => {
    try {
      for (const slide of slides) {
        if (
          !slide.heading ||
          !slide.description ||
          !slide.images ||
          !slide.category
        ) {
          setError(true)
          return;
        }
      }
      // Combine data from all slides into a single bundle
      const postData = {
        slides: slides.map(({ id, ...rest }) => rest),
      };

      const loginToken = localStorage.getItem("loginToken");
      const registerToken = localStorage.getItem("registerToken");

      let token = 0;
      if (loginToken) {
        token = loginToken;
      } else if (registerToken) {
        token = registerToken;
      }

      const response = await postStory(postData, token);
      console.log(response);
      setSlides([
        { id: 1, heading: "", description: "", images: "", category: "" },
        { id: 2, heading: "", description: "", images: "", category: "" },
        { id: 3, heading: "", description: "", images: "", category: "" },
      ]);
      toast.success("Story Posted");

    } catch (err) {
      console.error(err);
      toast.error("Oops! Something is wrong")
    }
  };

  const handleSlideChange = (id) => {
    setCurrentSlide(id);
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(1, prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(slides.length, prevSlide + 1));
  };

  return (
    <div>
      <Toast/>
      <div className={postStyle.btnparent}>
        {slides.map((slide) => (
          <div key={slide.id} className={postStyle.buttoncontainer}>
            {slide.id >= 4 && (
              <img
                className={postStyle.btnclose}
                width={13}
                height={13}
                src={close}
                onClick={() => handleRemoveSlide(slide.id - 1)}
              ></img>
            )}
            <button
              onClick={() => handleSlideChange(slide.id)}
              className={`${postStyle.slidebtn} ${
                selectedSlide === slide.id ? postStyle.selected : ""
              }`}
            >
              Slide {slide.id}
            </button>
          </div>
        ))}
        <button onClick={handleAddSlide} className={postStyle.addbtn}>
          Add +
        </button>
      </div>

      <div className={postStyle.inputs}>
        <label className={postStyle.labels}>Heading: </label>
        <input
          className={postStyle.heading}
          type="text"
          placeholder="Your Heading"
          name="heading"
          value={slides[currentSlide - 1].heading}
          onChange={(e) => handleInputChange(e, currentSlide)}
        />

        <br />

        <label className={postStyle.labels}>Description: </label>
        <input
          className={postStyle.description}
          placeholder="Story Description"
          name="description"
          value={slides[currentSlide - 1].description}
          onChange={(e) => handleInputChange(e, currentSlide)}
        ></input>

        <br />

        <label className={postStyle.labels}>Image Url: </label>
        <input
          className={postStyle.image}
          type="text"
          placeholder="Image URL"
          name="images"
          value={slides[currentSlide - 1].images}
          onChange={(e) => handleInputChange(e, currentSlide)}
        />

        <br />

        <label className={postStyle.labels}>Category: </label>
        <select
          className={postStyle.category}
          name="category"
          value={slides[currentSlide - 1].category}
          onChange={(e) => handleInputChange(e, currentSlide)}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="food">Food</option>
          <option value="healthandfitness">Health and Fitness</option>
          <option value="travel">Travel</option>
          <option value="movies">Movies</option>
          <option value="education">Education</option>
        </select>
      </div>
      {error? "Minimum 3 slides and All the fields are required": ""}

      <div className={postStyle.buttons}>
        <button onClick={handlePreviousSlide} className={postStyle.previous}>
          Previous
        </button>
        <button onClick={handleNextSlide} className={postStyle.next}>
          Next
        </button>
        <button onClick={handlePost} className={postStyle.post}>
          Edit
        </button>
      </div>
    </div>
  );
}
