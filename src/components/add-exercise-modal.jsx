import React from "react";

export default function AddExerciseModal({ setExercises }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const exerciseName = form[0].value;
    const sets = form[1].value;
    console.log({ form });
    if (exerciseName && sets) {
      setExercises((prev) => [...prev, { exerciseName, sets: parseInt(sets) }]);
    }
  };
  return (
    <dialog id="add-exercise" className="modal">
      <div className="modal-box bg-base-300 rounded-lg">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col items-center justify-between gap-4 ">
          <form id="addExerciseForm" className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Exercise name"
              className="input w-full focus:outline-none focus:bg-base-400 focus:rounded-lg"
            />
            <input
              type="text"
              placeholder="How many sets?"
              className="input input-ghost w-full focus:outline-none focus:bg-base-400 focus:rounded-lg"
            />
            <button>Save</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
