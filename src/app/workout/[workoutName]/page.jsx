import React from "react";
import Session from "./Session";

export default async function WorkoutName({ params }) {
  const workoutName = (await params).workoutName.replaceAll("-", " ");
  return (
    <>
      <Session workoutName={workoutName} />
    </>
  );
}
