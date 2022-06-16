import React from "react";
import { fishAttributes } from "../constants/fish_constants";
import { FishTank } from "./FishTank";

export const FishTankContainer = (): React.ReactElement => (
  <div className="row-span-1 col-span-full flex-container">
    <FishTank fishes={fishAttributes} />
    <div className="w-full h-full absolute select-none z-10" />
  </div>
);
