"use client";
import React, { useEffect, useState } from "react";

export default function DisplayWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [displayFullList, setDisplayFullList] = useState(false);
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    setWorkouts(savedWorkouts);
  }, []);
  const exerciseListBtnHandler = (event) => {
    event.stopPropagation();
    setDisplayFullList(!displayFullList);
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {workouts.length > 0 &&
        workouts.map((workouts, index) => (
          <div key={index} className="bg-base-300 px-4 py-6 rounded-lg">
            <h3 className="text-xl font-bold text-base-content">
              {workouts.name}
            </h3>
            <ul className={`${displayFullList || "exercise-list"}`}>
              {workouts.exercises.map((exercise, idx) => (
                <li key={idx}>
                  {exercise.exerciseName}
                  {exercise.sets}
                </li>
              ))}
            </ul>
            {workouts.exercises.length > 3 && (
              <button onClick={exerciseListBtnHandler}>
                {displayFullList ? "-" : "+"} {workouts.exercises.length - 3}
                {displayFullList ? "less" : "more"}
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
