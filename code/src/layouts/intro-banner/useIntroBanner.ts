import { useEffect, useState } from "react";

const useIntroBanner = (images: string[], intervalTime = 6000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, intervalTime]);

  return currentImageIndex;
};

export default useIntroBanner;
