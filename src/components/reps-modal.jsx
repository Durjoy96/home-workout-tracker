import React from "react";

export default function RepsModal({
  setTimeHandler,
  setCurrentSetsNum,
  maxSets,
}) {
  const formHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const reps = form.reps.value;
    if (reps) {
      document.getElementById("reps-modal").close();
      setTimeHandler(true);
      setCurrentSetsNum((prev) => {
        if (prev < maxSets) {
          return prev + 1;
        } else {
          return prev; // Do not increment if max sets reached
        }
      });
      form.reset(); // Reset the form after submission
    }   
  };
  return (
    <dialog id="reps-modal" className="modal">
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
            onSubmit={formHandler}
          >
            <div>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-base-content">
                  How many reps?
                </legend>
                <input
                  type="number"
                  placeholder="eg. 15"
                  className="p-2 w-full rounded-lg bg-base-400 focus:outline-base-400 focus:bg-base-400"
                  name="reps"
                />
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
