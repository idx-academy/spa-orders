import { useEffect, useState } from "react";

const useAppBanner = (images: string[], intervalTime = 6) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const intervalTimeInMilliseconds = intervalTime * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTimeInMilliseconds);

    return () => clearInterval(interval);
  }, [images.length, intervalTimeInMilliseconds]);

  return currentImageIndex;
};

export default useAppBanner;
