"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmptyWorkoutPng from "@/assets/img/empty-workout.png";

export default function EmptyWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    setWorkouts(savedWorkouts);
  }, []);
  return (
    <>
      {workouts.length === 0 && (
        <div>
          <Image
            src={EmptyWorkoutPng}
            alt="No Workouts"
            className="w-44 h-auto mx-auto mb-4"
          />
          <p className="text-sm text-base-content-secondary text-center">
            No workouts created yet.
          </p>
        </div>
      )}
    </>
  );
}
