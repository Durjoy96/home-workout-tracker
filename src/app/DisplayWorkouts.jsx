"use client";
import { Edit2Icon, Play, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function DisplayWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [displayFullList, setDisplayFullList] = useState(false);
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    setWorkouts(savedWorkouts);
  }, []);
  const exerciseListBtnHandler = (event) => {
    event.stopPropagation();
    setDisplayFullList(!displayFullList);
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {workouts.length > 0 &&
        workouts.map((workouts, index) => (
          <div
            key={index}
            className="bg-base-300 px-4 py-6 rounded-lg flex justify-between items-center border border-base-400"
          >
            <div className="self-start">
              <h3 className="text-xl font-bold text-base-content">
                {workouts.name}
              </h3>
              <ul
                className={`${
                  displayFullList || "exercise-list"
                } space-y-1 mt-3`}
              >
                {workouts.exercises.map((exercise, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="text-base font-medium text-base-content">
                      {exercise.exerciseName}
                    </span>
                    <span className="text-sm text-base-content-secondary font-normal">
                      {exercise.sets} Sets
                    </span>
                  </li>
                ))}
              </ul>
              {workouts.exercises.length > 3 && (
                <button
                  className="cursor-pointer text-primary hover:text-primary/90 text-base"
                  onClick={exerciseListBtnHandler}
                >
                  {displayFullList ? "-" : "+"}
                  {workouts.exercises.length - 3}
                  {displayFullList ? " less" : " more"}
                </button>
              )}
              <span className="block text-sm text-base-content-secondary mt-2">
                Rest Time: {workouts.restTime} min
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button className="circle-btn group">
                <Edit2Icon className="w-5 h-5 stroke-base-content-secondary group-hover:stroke-base-content" />
              </button>
              <button className="circle-btn group">
                <Trash2 className="w-5 h-5 stroke-base-content-secondary group-hover:stroke-base-content" />
              </button>
              <button className="circle-btn group">
                <Play className="w-5 h-5 stroke-primary group-hover:stroke-base-content fill-primary group-hover:fill-base-content" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
