import React from "react";

export default function WorkoutNameModal({ setExercises, exercises }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const workoutName = form[0].value;
    console.log(workoutName);
  };
  return (
    <dialog id="save-workout" className="modal">
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
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Provide a Workout Name
              </legend>
              <input
                type="text"
                placeholder="eg. Full Body Workout"
                className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                required
              />
            </fieldset>
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
