import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { useKeypresses } from "../hooks/useKeypresses";

export const Settings = (): React.ReactElement => {
  useKeypresses({
    actionKeymap: {
      Escape: () => appWindow.close(),
    },
  });

  return <div>settings</div>;
};
