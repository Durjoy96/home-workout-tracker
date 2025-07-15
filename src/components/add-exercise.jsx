import React from "react";

export default function AddExercise({ deleteExerciseHandler, index }) {
  console.log("AddExercise component rendered with index:", index);
  return (
    <div className="text-base-content">
      <h2>add-exercise</h2>
      <button
        onClick={() => deleteExerciseHandler(index)}
        className="text-base-content"
      >
        Delete
      </button>
    </div>
  );
}
