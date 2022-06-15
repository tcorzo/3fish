import React from "react";

export const Titlebar = (): React.ReactElement => (
  <div className="row-span-1 col-span-1 bg-blue flex-container">
    <img
      className="absolute bottom-[2px]"
      alt="so long"
      src="/images/so_long.png"
    />
    <div
      data-tauri-drag-region
      className="w-full h-full absolute select-none z-10"
    />
  </div>
);
