import React, { useState, useEffect } from "react";

export default function RestTimer({ restTime, setDisplayRestTimer }) {
  const [timeLeft, setTimeLeft] = useState(restTime * 5);

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
      <h2 className="text-3xl font-bold text-base-content text-center">
        Rest Timer
      </h2>
      <p className="text-5xl text-center">{formatTime(timeLeft)}</p>
    </div>
  );
}
