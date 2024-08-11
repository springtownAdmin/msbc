"use client";

import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = ({ color = "#12160F" }) => {

  return (
    <div className="flex w-full justify-center items-center">
      <Loader height={25} width={25} color={color} />
    </div>
  );

};

export default Loading;

export const Loader = ({
  width = 30,
  height = 30,
  color = "#d1ffb5",
  strokeWidth = 5,
  strokeWidthSecondary = 5,
}) => {
  return (
    <div>
      <Oval
        height={height}
        width={width}
        color={color}
        secondaryColor={color}
        strokeWidth={strokeWidth}
        strokeWidthSecondary={strokeWidthSecondary}
      />
    </div>
  );
};