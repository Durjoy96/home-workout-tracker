import { useRouter } from "next/navigation";
import React from "react";

export default function WorkoutNameModal({ setExercises, exercises }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target;
    const workoutName = form.workoutName.value;
    const restTime = form.restTime.value;
    console.log(workoutName);
    if (workoutName) {
      const previousSavedWorkouts = JSON.parse(
        localStorage.getItem("workouts") || "[]"
      ); // Retrieve previous workouts from localStorage

      const NewWorkouts = [
        ...previousSavedWorkouts,
        { name: workoutName, restTime, exercises },
      ]; // Append new workout with exercises

      // Save the updated workouts to localStorage
      localStorage.setItem("workouts", JSON.stringify(NewWorkouts));
      alert(`Workout "${workoutName}" saved successfully!`);
      setExercises([]); // Clear exercises after saving
      form.reset();
      document.getElementById("save-workout").close(); // Close the modal
      router.push("/"); // Redirect to home page
    }
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
                  required
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
