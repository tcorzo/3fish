import { useContext, useEffect, useRef, useState } from "react";
import { AudioContextReact } from "../context/audio_context";
import { WinButtonDecorations } from "./WinButtonDecorations";

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
      style={{
        position: "absolute",
        transition: "200ms ease-in-out",
        backgroundColor: "#c3c3c3",
        opacity: isVolumeVisible ? 1 : 0,
        border: "2px solid black",
        height: 32,
        bottom: 18,
        left: 18,
        right: 18,
        zIndex: 2,
        padding: 4,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <WinButtonDecorations thin />
      {new Array(Math.floor(state.volume * 20)).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            height: "100%",
            width: "calc(5% - 4px)",
            margin: "0px 2px",
            backgroundColor: "#000082",
          }}
        />
      ))}
    </div>
  );
};
