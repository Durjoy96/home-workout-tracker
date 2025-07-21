import { Home, Repeat, Timer } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SessionComplete({ sessionData }) {
  const formateAvgSetsTime = (sets, totalSets) => {
    const AvgDuration =
      sets.reduce((acc, curr) => acc + Number(curr.duration), 0) / totalSets;
    if (AvgDuration < 60) {
      return `${Math.floor(AvgDuration)} sec`;
    } else {
      const minutes = Math.floor(AvgDuration / 60);
      const seconds = AvgDuration % 60;
      return `${minutes} min ${seconds} sec`;
    }
  };

  const formateSessionTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} sec`;
    } else {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min} min ${sec} sec`;
    }
  };
  return (
    <div>
      <div>
        <div>
          <h2 className="text-3xl font-bold text-center text-base-content">
            Workout Finished 🎉
          </h2>
          <span className="text-base font-normal text-base-content-secondary text-center block mt-1">
            {sessionData.workoutName}
          </span>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-base-content-secondary">
            Summary
          </h3>
          <div className="mt-4 grid gap-4">
            {sessionData.exercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-base-300 p-4 rounded-lg border border-base-400"
              >
                <h4 className="text-2xl text-base-content font-semibold flex items-center gap-2">
                  {exercise.exerciseName}{" "}
                  <span className=" text-sm font-normal text-base-content-secondary">
                    ({exercise.totalSets} Sets)
                  </span>
                </h4>
                {/* exercise type and total sets */}
                <div className="flex justify-between flex-wrap text-sm text-base-content-secondary pb-3 border-b border-base-400 mt-3">
                  <span>Type: {exercise.exerciseType}</span>
                  {exercise.exerciseType === "Reps" && (
                    <span>
                      Total Reps:{" "}
                      {exercise.sets.reduce((acc, curr) => acc + curr.reps, 0)}
                    </span>
                  )}
                  {exercise.exerciseType === "Reps" && (
                    <span>
                      Avg. Time:{" "}
                      {formateAvgSetsTime(exercise.sets, exercise.totalSets)}
                    </span>
                  )}
                </div>
                {/* sets and reps */}
                <div className="overflow-x-auto rounded-box border border-base-500 bg-base-400 rounded-lg mt-3">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        {exercise.sets.map((set, idx) => (
                          <th
                            key={idx}
                            className="text-base-content-secondary text-base font-semibold"
                          >
                            Set {set.setNumber}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        {exercise.sets.map((set, idx) => (
                          <td
                            key={idx}
                            className="text-base-content border-t border-base-500 text-sm font-medium"
                          >
                            {set.reps && (
                              <span className="flex gap-1 items-center">
                                <Repeat className="w-3 h-3 stroke-base-content" />{" "}
                                {set.reps} reps
                              </span>
                            )}

                            {/* {set.reps && `${set.reps} reps`}{" "} */}
                            <span className="flex gap-1 items-center">
                              <Timer className="w-3 h-3 stroke-base-content" />{" "}
                              {set.duration} sec
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            {/* workout and total rest times */}
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg text-base-content font-semibold">
                  Total Workout Time
                </span>
                <span className="text-base-content-secondary text-sm flex gap-1 items-center">
                  <Timer className="w-4 h-4 stroke-base-content-secondary" />
                  {formateSessionTime(sessionData.sessionTime)}
                </span>
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-lg text-base-content font-semibold">
                  Total Rest Time
                </span>
                <span className="text-base-content-secondary text-sm flex gap-1 items-center">
                  <Timer className="w-4 h-4 stroke-base-content-secondary" />{" "}
                  {sessionData.totalRestTime} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* home button */}
      <Link href="/" className="block">
        <button className="primary-btn w-full mt-12">Home</button>
      </Link>
    </div>
  );
}
