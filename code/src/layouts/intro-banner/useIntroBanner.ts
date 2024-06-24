import { useEffect, useState } from "react";

const useIntroBanner = (length: number, intervalTime = 6000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [length, intervalTime]);

  return currentImageIndex;
};

export default useIntroBanner;
