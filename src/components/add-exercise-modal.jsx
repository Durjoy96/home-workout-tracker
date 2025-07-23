"use client";

import React, { useState } from "react";

export default function AddExerciseModal({ setExercises }) {
  const [displayDurationInput, setDisplayDurationInput] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const exerciseName = form.exerciseName.value;
    const sets = form.sets.value;
    const exerciseType = form.exerciseType.value;
    const duration = displayDurationInput ? form.duration.value : 0;
    console.log(exerciseName, sets, exerciseType);
    if (exerciseName && sets) {
      setExercises((prev) => [
        ...prev,
        {
          exerciseName:
            exerciseName.slice(0, 1).toUpperCase() + exerciseName.slice(1),
          sets: parseInt(sets),
          exerciseType,
          duration: parseInt(duration),
        },
      ]);
      form.reset();
      setDisplayDurationInput(false); // Reset the duration input display state
      document.getElementById("add-exercise").close(); // Close the modal
    }
  };
  return (
    <dialog id="add-exercise" className="modal">
      <div className="modal-box bg-base-300 rounded-lg max-w-sm">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <form id="addExerciseForm" className="w-full" onSubmit={handleSubmit}>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-base-content">
                Exercise Name
              </legend>
              <input
                type="text"
                placeholder="eg. Push Ups"
                className="p-2 w-full text-sm rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                name="exerciseName"
                required
              />
            </fieldset>
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-base-content">
                How many sets?
              </legend>
              <input
                type="number"
                placeholder="eg. 3"
                className="p-2 w-full text-sm rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                name="sets"
                required
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-base-content">
                Exercise Type
              </legend>
              <select
                defaultValue="Reps"
                name="exerciseType"
                className="p-2.5 text-sm w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                onChange={(e) => {
                  if (e.target.value === "Time") {
                    setDisplayDurationInput(true);
                  } else {
                    setDisplayDurationInput(false);
                  }
                }}
              >
                <option value="Reps">Reps Based</option>
                <option value="Time">Time Based</option>
              </select>
            </fieldset>

            <fieldset
              className={`fieldset w-full relative ${
                displayDurationInput ? "block" : "hidden"
              }`}
            >
              <legend className="fieldset-legend text-base-content">
                Hold time per set
              </legend>
              <input
                type="number"
                placeholder="eg. 30"
                className="p-2 w-full text-sm rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                name="duration"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-base-content">
                sec
              </span>
            </fieldset>

            <button
              type="submit"
              className="w-full border-2 bg-primary border-primary p-2 rounded-lg cursor-pointer text-base-content mt-6"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
