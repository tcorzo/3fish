import React from "react";

export const TitleBar = ({ title }: { title: string }): React.ReactElement => (
  <div className="flex-1 h-[36px] bg-blue flex-container">
    <span className="absolute text-white font-system text-[200%] mt-[6px]">
      {title}
    </span>
    <div
      data-tauri-drag-region
      className="w-full h-full absolute select-none z-10"
    />
  </div>
);
