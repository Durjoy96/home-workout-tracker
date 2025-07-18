"use client";

import React, { useEffect, useState } from "react";

export default function Session({ workoutName }) {
  const [exercises, setExercises] = useState(null);
  const [sessionTime, setSessionTime] = useState(0); // Time in seconds
  const [setTime, setSetTime] = useState(0); // Time in seconds
  const [displayCompletedBtn, setDisplayCompletedBtn] = useState(false);

  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem("workouts")).filter(
      (workout) => workout.name === workoutName
    );
    setExercises(exercises[0]);
    console.log(exercises[0].exercises[0].exerciseName);
  }, [workoutName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const setTimeHandler = () => {
    const timer = setInterval(() => {
      setSetTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const formatSetsTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const formatSessionTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      {exercises && exercises.exercises.length > 0 && (
        <div className="px-4 py-8 flex flex-col justify-between min-h-screen">
          <div>
            <h2 className="text-base font-normal text-base-content-secondary text-center">
              {workoutName} Session{" "}
              <span>{formatSessionTime(sessionTime)}</span>
            </h2>
            <h3 className="text-3xl font-bold text-base-content text-center mt-4">
              {exercises.exercises[0].exerciseName}
            </h3>
            <span className="text-base-content-secondary text-center block mt-2">
              Set 1 of {exercises.exercises[0].sets}
            </span>
          </div>
          <div>
            <span className="text-6xl font-bold block text-center">
              {formatSetsTime(setTime)}
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                setTimeHandler();
                setDisplayCompletedBtn((prev) => !prev);
              }}
              className={`primary-btn ${
                displayCompletedBtn ? "hidden" : "block"
              }`}
            >
              Start {exercises.exercises[0].exerciseName}
            </button>
            <button
              className={`secondary-btn ${
                displayCompletedBtn ? "block" : "hidden"
              }`}
            >
              Set Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
