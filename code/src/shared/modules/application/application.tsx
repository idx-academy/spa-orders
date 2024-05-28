import "./application.scss";
import { ReactNode } from "react";

type ApplicationProps = {
  children: ReactNode;
}

const Application = ({ children }: ApplicationProps) => {
  return (
    <div className="application">
      <h1 className="application__header">Hello, React with Webpack!</h1>
      {children}
    </div>
  );
};

export default Application;