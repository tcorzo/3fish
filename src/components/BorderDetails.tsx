import React from "react";

export const BorderDetails = (): React.ReactElement => (
  <>
    <div className="border-corner top-[-2px] left-[-2px]" />
    <div className="border-corner top-[-2px] right-[-2px]" />
    <div className="border-corner bottom-[-2px] right-[-2px]" />
    <div className="border-corner bottom-[-2px] left-[-2px]" />
  </>
);
