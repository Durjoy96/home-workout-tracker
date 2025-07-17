"use client";
import React, { useEffect, useState } from "react";

export default function DisplayWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    setWorkouts(savedWorkouts);
  }, []);
  return (
    <div>
      {workouts.length > 0 &&
        workouts.map((workouts, index) => (
          <div key={index}>{workouts.name}</div>
        ))}
    </div>
  );
}
