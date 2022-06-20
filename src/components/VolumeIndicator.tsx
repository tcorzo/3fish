import React, { useContext, useRef, useState } from "react";
import { AudioContextReact } from "../context/audio_context";
import { useKeypresses } from "../hooks/useKeypresses";
import { usePreviousValue } from "../hooks/usePreviousValue";

const volumeSegments = 30;

export const VolumeIndicator = (): React.ReactElement => {
  const { state, actions } = useContext(AudioContextReact);
  const [isVolumeVisible, setVolumeVisible] = useState(false);
  const volumeVisibilityTimeout = useRef<NodeJS.Timeout>();

  const triggerVisibility = () => {
    setVolumeVisible(true);
    volumeVisibilityTimeout.current = setTimeout(
      () => setVolumeVisible(false),
      1000
    );
    return () =>
      clearTimeout(
        volumeVisibilityTimeout.current ? volumeVisibilityTimeout.current : 0
      );
  };

  usePreviousValue(state.volume, triggerVisibility);
  usePreviousValue(state.isMuted, triggerVisibility);

  useKeypresses({
    actionKeymap: {
      KeyM: () => actions.toggleMute(),
    },
  });

  return (
    <div
      style={{ opacity: isVolumeVisible ? 1 : 0 }}
      className="bg-blue transition-opacity absolute p-[4px] flex bottom-[18px] left-[18px] right-[18px] z-10"
    >
      <div className="flex-fit flex flex-col border-2 p-2 border-white">
        <div className="flex flex-row items-center justify-between">
          <span className="pl-[2px] text-white font-system tracking-wide text-[200%]">
            Volume
          </span>
          {state.isMuted ? (
            <span className="pl-[2px] text-white font-system tracking-wide text-[200%]">
              <u>M</u>uted
            </span>
          ) : null}
        </div>
        <div className="flex flex-row h-[32px]">
          {new Array(Math.floor(volumeSegments)).fill(0).map((_, i) => {
            const isExpanded = volumeSegments * state.volume > i;
            return (
              <div
                key={i}
                style={{
                  width: `calc(100% / ${volumeSegments} - 4px)`,
                  height: isExpanded ? "100%" : "10%",
                }}
                className="mx-[2px] bg-white self-center"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
