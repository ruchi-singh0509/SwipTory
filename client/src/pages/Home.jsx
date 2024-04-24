import React, { useState, useEffect, Fragment } from "react";
import FilterCard from "../Components/FilterCard";
import UserStories from "../Components/UserStories";
import FoodStories from "../Components/FoodStories";
import Health from "../Components/Health";
import Travel from "../Components/Travel";
import Movies from "../Components/Movies";
import Education from "../Components/Education";

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setLoggedIn(!!loginToken);
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <FilterCard onCardClick={handleCardClick} />
      {(isLoggedIn && selectedCategory === null) || selectedCategory === "All" ? (
        <Fragment>
          <UserStories />
          <FoodStories />
          <Health />
          <Travel />
          <Education />
        </Fragment>
      ) : (
        <Fragment>
          {selectedCategory === "Food" && <FoodStories />}
          {selectedCategory === "Health and Fitness" && <Health />}
          {selectedCategory === "Travel" && <Travel />}
          {selectedCategory === "Movies" && <Movies />}
          {selectedCategory === "Education" && <Education />}
        </Fragment>
      )}
      {!isLoggedIn && (
        <Fragment>
          <FoodStories />
          <Health />
          <Travel />
          <Education />
        </Fragment>
      )}
    </div>
  );
}
