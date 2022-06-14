import React from "react";

export const ImageProtector = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
): React.ReactElement => (
  <div
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      zIndex: 10,
    }}
    {...props}
  />
);
