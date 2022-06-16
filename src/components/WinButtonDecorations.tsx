import React from "react";

export const WinButtonDecorations = ({
  thin,
}: {
  thin?: boolean;
}): React.ReactElement => (
  <div className="h-full w-full absolute bg-grey -z-10 ">
    <div className="bg-white h-[2px] absolute top-0 left-0 right-[2px] z-20" />
    <div className="bg-white w-[2px] absolute top-0 left-0 bottom-[2px] z-20" />
    <div
      style={{ height: thin ? 2 : 4 }}
      className={"bg-dark-grey absolute right-0 left-0 bottom-0 z-10"}
    />
    <div
      style={{ width: thin ? 2 : 4 }}
      className={"bg-dark-grey absolute top-0 right-0 bottom-0 z-10"}
    />
  </div>
);
