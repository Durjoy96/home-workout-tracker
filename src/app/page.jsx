"use client";

import AddExercise from "@/components/add-exercise";
import { useState } from "react";

export default function Home() {
  const [exercise, setExercise] = useState([]);
  const addExerciseHandler = () => {
    setExercise((prev) => [
      ...prev,
      <AddExercise
        key={prev.length}
        deleteExerciseHandler={deleteExerciseHandler}
        index={prev.length}
      />,
    ]);
  };

  const deleteExerciseHandler = (index) => {
    setExercise((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-base-200 px-4 py-8 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-base-content">
        Create Workout Routine
      </h2>
      {exercise}
      <button
        onClick={addExerciseHandler}
        className="py-3 px-4 rounded-lg border-2 border-base-300 text-base-content w-full cursor-pointer hover:bg-base-300 transition-colors duration-200 mt-4"
      >
        + Add Exercise
      </button>
    </div>
  );
}
