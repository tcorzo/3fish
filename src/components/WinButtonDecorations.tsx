import React from "react";

export const WinButtonDecorations = ({
  thin,
}: {
  thin?: boolean;
}): React.ReactElement => (
  <>
    <div
      style={{
        backgroundColor: "white",
        height: 2,
        position: "absolute",
        top: 0,
        right: 2,
        left: 0,
        zIndex: 1,
      }}
    />
    <div
      style={{
        backgroundColor: "white",
        width: 2,
        position: "absolute",
        top: 0,
        bottom: 2,
        left: 0,
        zIndex: 1,
      }}
    />
    <div
      style={{
        backgroundColor: "#828282",
        height: thin ? 2 : 4,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
      }}
    />
    <div
      style={{
        backgroundColor: "#828282",
        width: thin ? 2 : 4,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
      }}
    />
  </>
);
