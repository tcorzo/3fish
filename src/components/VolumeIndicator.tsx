import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioContextReact } from "../context/audio_context";

const volumeSegments = 36;

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
      className="p-[4px] transition-opacity old-button flex flex-row absolute bg-grey border-black border-2 border-solid h-[32px] bottom-[18px] left-[18px] right-[18px] z-10"
    >
      {new Array(Math.floor(state.volume * volumeSegments))
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={{ width: `calc(100% / ${volumeSegments} - 2px)` }}
            className="h-full mx-[1px] bg-blue"
          />
        ))}
    </div>
  );
};
