"use client";

import AddExerciseModal from "@/components/add-exercise-modal";
import { useState } from "react";

export default function Home() {
  const [exercises, setExercises] = useState([]);

  return (
    <div className="bg-base-200 px-4 py-8 rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-base-content">
        Create Workout Routine
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        {exercises.length > 0 &&
          exercises.map((exercise) => (
            <div
              key={exercise.exerciseName}
              className="flex flex-col gap-1 bg-base-300 p-4 rounded-lg"
            >
              <span className="text-lg font-semibold">
                {exercise.exerciseName}
              </span>
              <span className="text-base text-base-content-secondary">
                {exercise.sets} sets
              </span>
            </div>
          ))}
      </div>
      <button
        onClick={() => document.getElementById("add-exercise").showModal()}
        className="py-3 px-4 rounded-lg border-2 border-base-300 text-base-content w-full cursor-pointer hover:bg-base-300 transition-colors duration-200 mt-4"
      >
        + Add Exercise
      </button>
      <AddExerciseModal setExercises={setExercises} />
    </div>
  );
}
