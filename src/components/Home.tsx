import React, { useContext } from "react";
import { BorderDetails } from "../components/BorderDetails";
import { VolumeIndicator } from "../components/VolumeIndicator";
import { TitleBar } from "../components/TitleBar";
import { FishTankContainer } from "../components/FishTankContainer";
import { useVolumeWheel } from "../hooks/useVolumeWheel";
import { AudioContextReact } from "../context/audio_context";
import { useKeypresses } from "../hooks/useKeypresses";
import { TitlebarButton } from "./TitlebarButton";
import { appWindow } from "@tauri-apps/api/window";

export const Home = (): React.ReactElement => {
  const { state, actions } = useContext(AudioContextReact);
  const isMuted = state.isMuted || state.volume === 0;

  useVolumeWheel();
  useKeypresses({
    actionKeymap: {
      KeyM: actions.toggleMute,
      KeyR: () => window.location.reload(),
    },
  });

  return (
    <div className="bg-grey absolute top-0 right-0 left-0 bottom-0 flex border-2 border-black">
      <BorderDetails />
      <div className="z-10 flex-1 self-stretch m-[4px] bg-black border-2 border-black border-solid grid grid-cols-titlebar grid-rows-titlebar gap-[2px]">
        <VolumeIndicator />
        <TitlebarButton
          imageFilename="minimize"
          onClick={() => appWindow.minimize()}
        />
        <TitlebarButton imageFilename="settings" onClick={() => 0} />
        <TitleBar />
        <TitlebarButton
          imageFilename={isMuted ? "mute" : "volume"}
          onClick={() => actions.toggleMute()}
        />
        <TitlebarButton
          imageFilename="close"
          onClick={() => appWindow.close()}
        />
        <FishTankContainer />
      </div>
    </div>
  );
};
