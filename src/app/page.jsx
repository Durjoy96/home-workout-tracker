import Image from "next/image";
import Link from "next/link";
import React from "react";
import EmptyWorkoutPng from "@/assets/img/empty-workout.png";

export default function Home() {
  return (
    <div className="bg-base-200 px-4 py-8 rounded-lg min-h-screen flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-base-content">Workouts</h2>
      </div>
      <div className="mt-4 ">
        <Image
          src={EmptyWorkoutPng}
          alt="No Workouts"
          className="w-44 h-auto mx-auto mb-4"
        />
        <p className="text-sm text-base-content-secondary text-center">
          No workouts created yet.
        </p>
      </div>

      <Link className="primary-btn text-center" href="/create">
        Create Workout Routine
      </Link>
    </div>
  );
}
