import React from "react";

const borderStyle: React.CSSProperties = {
  border: `2px solid black`,
  position: "absolute",
  height: 42,
  width: 42,
};

export const BorderDetails = (): React.ReactElement => (
  <>
    <div
      style={{
        ...borderStyle,
        top: -2,
        left: -2,
      }}
    />
    <div
      style={{
        ...borderStyle,
        top: -2,
        right: -2,
      }}
    />
    <div
      style={{
        ...borderStyle,
        bottom: -2,
        right: -2,
      }}
    />
    <div
      style={{
        ...borderStyle,
        bottom: -2,
        left: -2,
      }}
    />
  </>
);
