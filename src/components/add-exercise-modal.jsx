import { Save } from "lucide-react";
import React from "react";

export default function AddExerciseModal({ setExercises }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const exerciseName = form[0].value;
    const sets = form[1].value;
    if (exerciseName && sets) {
      setExercises((prev) => [
        ...prev,
        {
          exerciseName:
            exerciseName.slice(0, 1).toUpperCase() + exerciseName.slice(1),
          sets: parseInt(sets),
        },
      ]);
      form.reset();
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
          <form
            id="addExerciseForm"
            className="w-full flex flex-col items-center justify-between gap-4 mt-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Exercise Name"
              className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
              required
            />
            <input
              type="number"
              placeholder="How many sets?"
              className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
              required
            />
            <button
              type="submit"
              className="w-full border-2 bg-primary border-primary p-2 rounded-lg cursor-pointer text-base-content"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
