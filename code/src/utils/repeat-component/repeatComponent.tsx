import { ReactElement, cloneElement } from "react";

const repeatComponent = (component: ReactElement, copiesCount: number) => {
  return Array.from({ length: copiesCount }, (_, index) =>
    cloneElement(component, { key: index })
  );
};

export default repeatComponent;
