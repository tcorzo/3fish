import React from "react";

export const WinButtonDecorations = ({
  thin,
}: {
  thin?: boolean;
}): React.ReactElement => (
  <>
    {/* <div className="flex-1 self-stretch absolute bg-black z-30" /> */}
    <div className="bg-white h-[2px] absolute top-0 left-0 right-[2px] z-20" />
    <div className="bg-white w-[2px] absolute top-0 left-0 bottom-[2px] z-20" />
    <div
      className={`bg-black h-[${
        thin ? 2 : 4
      }px] absolute right-0 left-0 bottom-0 z-10`}
    />
    <div
      className={`bg-dark-grey w-[${
        thin ? 2 : 4
      }px] absolute top-0 right-0 bottom-0 z-10`}
    />
  </>
);
