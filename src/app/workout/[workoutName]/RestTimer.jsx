import React, { useState, useEffect } from "react";

export default function RestTimer({
  restTime,
  setDisplayRestTimer,
  exerciseName,
  currentSetsNum,
  maxSets,
}) {
  const [timeLeft, setTimeLeft] = useState(
    restTime * process.env.NEXT_PUBLIC_SECONDS_REST_TIME
  ); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) return setDisplayRestTimer((prev) => !prev);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-base-content text-center">
          Rest Time
        </h2>
        <p className="text-base font-normal text-base-content-secondary text-center mt-2">
          Next: {exerciseName} - Set {currentSetsNum} of {maxSets}
        </p>
      </div>
      <span className="text-6xl font-bold block text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {timeLeft <= 0 ? "Time's up!" : formatTime(timeLeft)}
      </span>
    </div>
  );
}
