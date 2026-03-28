import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import React from "react";
import { useKeypresses } from "../hooks/useKeypresses";

export const Settings = (): React.ReactElement => {
  useKeypresses({
    actionKeymap: {
      Escape: () => getCurrentWebviewWindow().close(),
    },
  });

  return <div>settings</div>;
};
