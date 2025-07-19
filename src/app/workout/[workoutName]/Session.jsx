"use client";

import RepsModal from "@/components/reps-modal";
import React, { useEffect, useState } from "react";
import RestTimer from "./RestTimer";

export default function Session({ workoutName }) {
  const [exercises, setExercises] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [setTime, setSetTime] = useState(0);
  const [displayCompletedBtn, setDisplayCompletedBtn] = useState(false);
  const [setTimer, setSetTimer] = useState(null);
  const [currentSetsNum, setCurrentSetsNum] = useState(null);
  const [maxSets, setMaxSets] = useState(null);
  const [displayRestTimer, setDisplayRestTimer] = useState(false);
  const [exerciseNum, setExerciseNum] = useState(0);
  const [sessionData, setSessionData] = useState({
    workoutName,
    exercises: [],
  });

  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem("workouts")).filter(
      (workout) => workout.name === workoutName
    );
    setExercises(exercises[0]);
    setMaxSets(exercises[0].exercises[exerciseNum].sets);
    setCurrentSetsNum(1);
  }, [workoutName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const setTimeHandler = (stop) => {
    if (stop) {
      clearInterval(setTimer);
      setSetTime(0);
      setDisplayCompletedBtn(false);
      setDisplayRestTimer((prev) => !prev);
      setCurrentSetsNum((prev) => {
        if (prev < maxSets) {
          return prev + 1;
        } else {
          return 1; // Reset sets count for the next exercise
        }
      });

      if (currentSetsNum >= maxSets) {
        setExerciseNum((prevExerciseNum) => prevExerciseNum + 1); // Move to the next exercise
      }

      setSessionData((prevData) => ({
        ...prevData,
        exercises: [...prevData.exercises, exercises.exercises[0]],
      }));
    } else {
      const timer = setInterval(() => {
        setSetTime((prevTime) => prevTime + 1);
      }, 1000);
      setSetTimer(timer);
    }
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
        <div className="px-4 py-8 flex flex-col justify-between min-h-dvh relative">
          {displayRestTimer ? (
            <RestTimer
              restTime={exercises.restTime}
              setDisplayRestTimer={setDisplayRestTimer}
              exerciseName={exercises.exercises[exerciseNum].exerciseName}
              currentSetsNum={currentSetsNum}
              maxSets={maxSets}
              exerciseNum={exerciseNum}
            />
          ) : (
            <>
              <div>
                <h2 className="text-base font-normal text-base-content-secondary text-center">
                  {workoutName} Session{" "}
                  <span>{formatSessionTime(sessionTime)}</span>
                </h2>
                <h3 className="text-3xl font-bold text-base-content text-center mt-4">
                  {exercises.exercises[exerciseNum].exerciseName}
                </h3>
                <span className="text-base-content-secondary text-center block mt-2">
                  Set {currentSetsNum} of {maxSets}
                </span>
              </div>
              <div>
                <span className="text-6xl font-bold block text-center">
                  {formatSetsTime(setTime)}
                </span>
              </div>
            </>
          )}
          <div className={`${displayRestTimer ? "hidden" : "block"} mt-8`}>
            <button
              onClick={() => {
                setTimeHandler();
                setDisplayCompletedBtn((prev) => !prev);
              }}
              className={`primary-btn ${
                displayCompletedBtn ? "hidden" : "block"
              }`}
            >
              Start {exercises.exercises[exerciseNum].exerciseName}
            </button>
            <button
              className={`secondary-btn ${
                displayCompletedBtn ? "block" : "hidden"
              }`}
              onClick={() => document.getElementById("reps-modal").showModal()}
            >
              Set Completed
            </button>
          </div>
        </div>
      )}
      <RepsModal
        setTimeHandler={setTimeHandler}
        setCurrentSetsNum={setCurrentSetsNum}
        maxSets={maxSets}
        setExerciseNum={setExerciseNum}
      />
    </div>
  );
}
