"use client";

import React, { useEffect, useState } from "react";

export default function Session({ workoutName }) {
  const [exercises, setExercises] = useState(null);
  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem("workouts")).filter(
      (workout) => workout.name === workoutName
    );
    setExercises(exercises[0]);
    console.log(exercises[0].exercises[0].exerciseName);
  }, [workoutName]);
  return (
    <div>
      {exercises && exercises.exercises.length > 0 && (
        <span>{exercises.exercises[0].exerciseName}</span>
      )}
    </div>
  );
}
