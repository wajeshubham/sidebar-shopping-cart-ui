import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "75vh",
      }}
    >
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
};

export default CustomSpinner;
