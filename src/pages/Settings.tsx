import { appWindow } from "@tauri-apps/api/window";
import { useKeypresses } from "../hooks/useKeypresses";

export const Settings = () => {
  useKeypresses({
    actionKeymap: {
      Escape: () => appWindow.close(),
    },
  });

  return <div>settings</div>;
};
