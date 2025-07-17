"use client";

import AddExerciseModal from "@/components/add-exercise-modal";
import WorkoutNameModal from "@/components/workout-name-modal";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const saveWorkoutBtnHandler = () => {
    if (exercises.length === 0) {
      alert("Please add at least one exercise before saving the workout.");
      return;
    }
    document.getElementById("save-workout").showModal();
  };
  return (
    <div className="min-h-screen px-4 py-8 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold text-base-content">
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
          className="outline-btn mt-4 flex gap-1 items-center justify-center"
        >
          <Plus className="w-8 hy-8 stroke-primary" /> Add Exercise
        </button>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="outline-btn" onClick={saveWorkoutBtnHandler}>
          Save Workout
        </button>
        <button className="primary-btn">Start Workout 🔥</button>
      </div>
      <AddExerciseModal setExercises={setExercises} />
      <WorkoutNameModal setExercises={setExercises} exercises={exercises} />
    </div>
  );
}
