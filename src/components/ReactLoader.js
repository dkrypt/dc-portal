import React from "react";
import Loader from "react-loader-spinner";

export default function ReactLoader() {
  return (
    <Loader
      className="col-sm-12"
      type="Oval"
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
}
