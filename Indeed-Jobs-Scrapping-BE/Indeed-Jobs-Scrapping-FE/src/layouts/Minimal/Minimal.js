import React from "react";
import "./Minimal.scss";
const Minimal = (props) => {
  const { children } = props;
  return (
    <>
      <div className="minimal-layout-wrapper">{children}</div>
    </>
  );
};

export default Minimal;
