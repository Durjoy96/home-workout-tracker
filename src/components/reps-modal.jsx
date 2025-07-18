import React from "react";

export default function RepsModal() {
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
            className="w-full mt-2"
            onSubmit={handleSubmit}
          >
            <div>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-base-content">
                  Provide a Workout Name
                </legend>
                <input
                  type="text"
                  placeholder="eg. Full Body Workout"
                  className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                  name="workoutName"
                  autoFocus
                  required
                />
              </fieldset>
              <fieldset className="fieldset w-full relative">
                <legend className="fieldset-legend text-base-content">
                  Rest Time After Each Set
                </legend>
                <input
                  type="number"
                  placeholder="eg. 3"
                  className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                  name="restTime"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-base-content">
                  min
                </span>
              </fieldset>
            </div>
            <button
              type="submit"
              className="w-full border-2 bg-primary border-primary p-2 rounded-lg cursor-pointer text-base-content mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
