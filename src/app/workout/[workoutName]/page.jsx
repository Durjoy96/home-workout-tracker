import React from "react";
import Session from "./Session";

export default async function WorkoutName({ params }) {
  const workoutName = (await params).workoutName.replaceAll("-", " ");
  return (
    <>
      <div>
        <h2 className="text-base font-normal text-base-content-secondary text-center">
          {workoutName} Session
        </h2>
      </div>
      <Session workoutName={workoutName} />
    </>
  );
}
