import Link from "next/link";
import React from "react";
import DisplayWorkouts from "./DisplayWorkouts";
import EmptyWorkouts from "./EmptyWorkouts";

export default function Home() {
  return (
    <div className="bg-base-200 px-4 py-8 rounded-lg min-h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-base-content">Workouts</h2>
        <DisplayWorkouts />
      </div>
      <EmptyWorkouts />
      <Link className="primary-btn text-center" href="/create">
        Create Workout Routine
      </Link>
    </div>
  );
}
