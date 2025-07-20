"use client";

import RepsModal from "@/components/reps-modal";
import React, { useEffect, useState } from "react";
import RestTimer from "./RestTimer";
import SessionComplete from "./SessionComplete";

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
  const [exerciseType, setExerciseType] = useState(null);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [sessionData, setSessionData] = useState({
    workoutName,
    sessionTime: 0,
    date: new Date().toISOString(),
    restTime: exercises?.restTime || 0,
    exercises: [],
  });

  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem("workouts")).filter(
      (workout) => workout.name === workoutName
    );
    setExercises(exercises[0]);
    setMaxSets(exercises[0].exercises[exerciseNum].sets); // Set the maximum sets for the first exercise
    setCurrentSetsNum(1); // Initialize to 1 for the first set
  }, [workoutName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (exercises && exercises.exercises.length > 0) {
      setExerciseType(exercises?.exercises[exerciseNum]?.exerciseType);
      setMaxSets(() => exercises?.exercises[exerciseNum]?.sets); // Update max sets for the new exercise
    }
  }, [exerciseNum, exercises]);

  const setTimeHandler = (stop, reps = 0, duration = 0) => {
    if (stop) {
      clearInterval(setTimer);

      setSessionData((prevData) => {
        const updatedExercises = [...prevData.exercises];
        const currentExercise = updatedExercises[exerciseNum] || {
          exerciseName: exercises?.exercises[exerciseNum]?.exerciseName,
          exerciseType: exercises?.exercises[exerciseNum]?.exerciseType,
          totalSets: maxSets,
          sets: [],
        };

        // Add the current set data
        currentExercise.sets.push({
          setNumber: currentSetsNum,
          reps: reps || null, // Reps for rep-based exercises
          duration: duration || setTime, // Duration for time-based exercises
        });

        const removeSetsDuplicates = [
          ...new Set(currentExercise.sets.map((set) => set.setNumber)),
        ];
        currentExercise.sets = removeSetsDuplicates.map((setNumber) => {
          return currentExercise.sets.find(
            (set) => set.setNumber === setNumber
          );
        });

        updatedExercises[exerciseNum] = currentExercise;

        console.log("Updated Exercises:", {
          ...prevData,
          sessionTime: sessionTime,
          exercises: updatedExercises,
        });
        return {
          ...prevData,
          sessionTime: sessionTime,
          exercises: updatedExercises,
        };
      });

      if (exerciseType === "Time") {
        const duration = exercises.exercises[exerciseNum].duration; // it's seconds
        setSetTime(duration);
      } else {
        setSetTime(0);
      }

      if (
        exerciseNum >= exercises.exercises.length - 1 &&
        currentSetsNum >= maxSets
      ) {
        setWorkoutComplete(true); // Mark the workout as complete
        setDisplayRestTimer(false); // Hide the rest timer
      } else {
        setDisplayRestTimer(true); // Show the rest timer
      }

      setDisplayCompletedBtn(false);

      setCurrentSetsNum((prev) => {
        if (prev < maxSets) {
          return prev + 1; // Increment the set number
        } else {
          return 1; // Reset the set number for the next exercise
        }
      });

      if (currentSetsNum >= maxSets) {
        setExerciseNum((prevExerciseNum) => prevExerciseNum + 1); // Move to the next exercise
      }
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

  const timeBasedExerciseHandler = () => {
    const duration = exercises?.exercises[exerciseNum]?.duration; // it's seconds
    setSetTime(duration); // Initialize the timer with the duration

    // Clear any existing timer before starting a new one
    if (setTimer) {
      clearInterval(setTimer);
    }

    let isHandlerCalled = false;

    const timer = setInterval(() => {
      setSetTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          setSetTimer(null);
          if (!isHandlerCalled) {
            setTimeHandler(true, 0, duration); // Handle the end of the set
            isHandlerCalled = true; // Ensure the handler is called only once
          }
          return 0; // Ensure the timer stops at 0
        }
        return prevTime - 1; // Decrement the timer
      });
    }, 1000);

    setSetTimer(timer); // Save the timer reference for cleanup
  };

  return (
    <div>
      {exercises && exercises.exercises.length > 0 && (
        <div className="px-4 py-8 flex flex-col justify-between min-h-dvh relative">
          {displayRestTimer ? (
            <RestTimer
              restTime={exercises.restTime}
              setDisplayRestTimer={setDisplayRestTimer}
              exerciseName={exercises?.exercises[exerciseNum]?.exerciseName}
              currentSetsNum={currentSetsNum}
              maxSets={maxSets}
              exerciseNum={exerciseNum}
            />
          ) : (
            <>
              {workoutComplete ? (
                <SessionComplete />
              ) : (
                <>
                  <div>
                    <h2 className="text-base font-normal text-base-content-secondary text-center">
                      {workoutName} Session{" "}
                      <span>{formatSessionTime(sessionTime)}</span>
                    </h2>
                    <h3 className="text-3xl font-bold text-base-content text-center mt-4">
                      {exercises?.exercises[exerciseNum]?.exerciseName}
                    </h3>
                    <span className="text-base-content-secondary text-center block mt-2">
                      Set {currentSetsNum} of {maxSets}
                    </span>
                  </div>
                  <div>
                    {exerciseType === "Time" ? (
                      <span className="text-6xl font-bold block text-center">
                        {formatSetsTime(setTime)}
                      </span>
                    ) : (
                      <span className="text-6xl font-bold block text-center">
                        {formatSetsTime(setTime)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          <div
            className={`${
              displayRestTimer || workoutComplete ? "hidden" : "block"
            } mt-8`}
          >
            <button
              onClick={() => {
                if (exerciseType === "Time") {
                  timeBasedExerciseHandler();
                  setDisplayCompletedBtn((prev) => !prev);
                } else {
                  setTimeHandler(false);
                  setDisplayCompletedBtn((prev) => !prev);
                }
              }}
              className={`primary-btn ${
                displayCompletedBtn ? "hidden" : "block"
              }`}
            >
              Start {exercises?.exercises[exerciseNum]?.exerciseName}
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
      <RepsModal setTimeHandler={setTimeHandler} />
    </div>
  );
}
