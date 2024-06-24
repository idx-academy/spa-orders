import { useEffect, useState } from "react";

const useIntervalSwitcher = (length: number, intervalTime = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [length, intervalTime]);

  return currentIndex;
};

export default useIntervalSwitcher;
