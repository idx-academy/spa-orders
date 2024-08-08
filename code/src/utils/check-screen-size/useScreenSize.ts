import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
