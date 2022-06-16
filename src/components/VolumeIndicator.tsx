import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioContextReact } from "../context/audio_context";

const volumeSegments = 30;

export const VolumeIndicator = (): React.ReactElement => {
  const { state } = useContext(AudioContextReact);
  const [isVolumeVisible, setVolumeVisible] = useState(false);
  const previousVolume = useRef(state.volume);
  const volumeVisibilityTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (previousVolume.current === state.volume) return;
    previousVolume.current = state.volume;
    setVolumeVisible(true);
    volumeVisibilityTimeout.current = setTimeout(
      () => setVolumeVisible(false),
      1000
    );
    return () =>
      clearTimeout(
        volumeVisibilityTimeout.current ? volumeVisibilityTimeout.current : 0
      );
  }, [state.volume]);

  return (
    <div
      style={{ opacity: isVolumeVisible ? 1 : 0 }}
      className="bg-blue transition-opacity absolute p-[4px] flex bottom-[18px] left-[18px] right-[18px] z-10"
    >
      <div className="flex-fit flex flex-col border-2 p-2 border-white">
        <span className="text-white font-system self-stretch text-xl">
          Volume
        </span>
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
