type CheckWithinRange = {
  value: number;
  min: number;
  max: number;
};

const checkWithinRange = ({ value, min, max }: CheckWithinRange) => {
  return value >= min && value <= max;
};

export default checkWithinRange;
