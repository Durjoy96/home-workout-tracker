import React from "react";

export default function SessionComplete({ sessionData }) {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-center text-base-content">
          Workout Finished 🎉
        </h2>
        <span className="text-base font-normal text-base-content-secondary text-center block mt-1">
          {sessionData.workoutName}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-base-content-secondary">
          Summary
        </h3>
        <div className="mt-2 grid gap-4">
          {sessionData.exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-base-300 p-4 rounded-lg border border-base-400"
            >
              <h4 className="text-lg text-base-content font-semibold">
                {exercise.exerciseName}
              </h4>
              {/* exercise type and total sets */}
              <div className="flex justify-between text-sm text-base-content-secondary py-3 border-b border-t border-base-400 mt-2">
                <span>Type: {exercise.exerciseType}</span>
                <span>Sets: {exercise.totalSets}</span>
              </div>
              {/* sets and reps */}
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-transparent rounded-lg mt-3">
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
                          className="text-base-content border-t border-base-400 text-sm font-medium"
                        >
                          {set.reps || set.duration} {set.reps ? "Reps" : "Sec"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* {
  "workoutName": "test session complete",
  "sessionTime": 8,
  "date": "2025-07-21T04:34:31.783Z",
  "restTime": 0,
  "exercises": [
      {
          "exerciseName": "Pushup",
          "exerciseType": "Reps",
          "totalSets": 1,
          "sets": [
              {
                  "setNumber": 1,
                  "reps": 10,
                  "duration": 5
              }
          ]
      }
  ]
} */
