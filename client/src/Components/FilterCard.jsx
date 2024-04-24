import React,{useState} from "react";
import card from "../styles/filtercard.module.css";
import all from "../assets/images/all.png";
import food from "../assets/images/food.jpg";
import healthandfitness from "../assets/images/health.jpg";
import travel from "../assets/images/travel.jpg";
import movies from "../assets/images/movies.jpg";
import education from "../assets/images/education.jpg";

export default function FilterCard({onCardClick}) {
  const filters = [
    {
      id: 1,
      title: "All",
      image: all,
    },
    {
      id: 2,
      title: "Food",
      image: food,
    },
    {
      id: 3,
      title: "Health and Fitness",
      image: healthandfitness,
    },
    {
      id: 4,
      title: "Travel",
      image: travel,
    },
    {
      id: 5,
      title: "Movies",
      image: movies,
    },
    {
      id: 6,
      title: "Education",
      image: education,
    },
  ];

  return (
    <div className={card.parent}>
      {filters.map((item) => (
        <div
          key={item.id}
          className={card.card}
          onClick={() => onCardClick(item.title)}
        >
          <img src={item.image} alt={item.title}  className={card.image}/>
          <div className={card.overlay}>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
