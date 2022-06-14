import React, { useCallback, useEffect, useRef, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { WinButtonDecorations } from "./components/WinButtonDecorations";
import { ImageProtector } from "./components/ImageProtector";
import { BorderDetails } from "./components/BorderDetails";
import "./App.css";
import { VolumeIndicator } from "./components/VolumeIndicator";
import { SingleFish } from "./components/SingleFish";

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setVolumeVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeVisibilityTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateVolume = useCallback(
    (newValue: number) => {
      const clampedValue =
        Math.round(Math.min(Math.max(newValue, 0), 1) * 10) / 10;
      if (clampedValue > 0 && isMuted) setIsMuted(true);
      setVolume(clampedValue);
    },
    [isMuted]
  );

  const toggleMute = useCallback(() => {
    if (volume === 0) updateVolume(0.2);
    else setIsMuted((val) => !val);
  }, [updateVolume, volume]);

  const onVolumeWheel = useCallback(
    (evt: WheelEvent) => {
      const scrollUp = evt.deltaY < 0;
      if (volume > 1 && scrollUp) return;
      if (volume < 0 && !scrollUp) return;
      updateVolume(volume + (scrollUp ? 0.1 : -0.1));
    },
    [updateVolume, volume]
  );

  const onKeypress = useCallback(
    (evt: KeyboardEvent) => {
      switch (evt.code) {
        case "KeyM":
          evt.preventDefault();
          toggleMute();
          break;
        case "Escape":
          evt.preventDefault();
          appWindow.close();
          break;
        default:
          console.debug(evt.code);
          break;
      }
    },
    [toggleMute]
  );

  useEffect(() => {
    if (audioRef.current) setVolume(0.6);
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    setVolumeVisible(true);
    volumeVisibilityTimeout.current = setTimeout(
      () => setVolumeVisible(false),
      1000
    );
    return () =>
      clearTimeout(
        volumeVisibilityTimeout.current ? volumeVisibilityTimeout.current : 0
      );
  }, [volume]);

  useEffect(() => {
    window.addEventListener("wheel", onVolumeWheel);
    window.addEventListener("keypress", onKeypress);
    return () => {
      window.removeEventListener("wheel", onVolumeWheel);
      window.removeEventListener("keypress", onKeypress);
    };
  }, [onVolumeWheel, onKeypress]);

  return (
    <div
      style={{
        backgroundColor: "#c3c3c3",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: "flex",
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "solid",
      }}
      className="App"
    >
      <audio
        ref={audioRef}
        src="/gymnopedie.mp3"
        autoPlay
        muted={isMuted}
        loop
      />
      <BorderDetails />
      <div
        style={{
          zIndex: 1,
          flex: 1,
          alignSelf: "stretch",
          margin: 4,
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "black",
          borderStyle: "solid",
          display: "grid",
          gridTemplateColumns: "36px 1fr repeat(2, 36px)",
          gridTemplateRows: "36px 1fr",
          gap: "2px",
        }}
      >
        <VolumeIndicator isVolumeVisible={isVolumeVisible} volume={volume} />
        <div
          style={{
            gridArea: "1 / 1 / 2 / 2",
            backgroundColor: "#c3c3c3",
            ...commonStyles.flexContainer,
          }}
          onClick={() => appWindow.minimize()}
        >
          <ImageProtector />
          <img style={commonStyles.image} alt="minimize" src="/minimize.png" />
        </div>
        <div
          style={{
            gridArea: "1 / 2 / 2 / 3",
            backgroundColor: "#000082",
            ...commonStyles.flexContainer,
          }}
        >
          <ImageProtector data-tauri-drag-region />
          <img
            style={{
              ...commonStyles.image,
              position: "absolute",
              bottom: 10,
            }}
            alt="so long"
            src="/so_long.png"
          />
        </div>
        <div
          style={{
            gridArea: "1 / 3 / 2 / 4",
            backgroundColor: "#c3c3c3",
            ...commonStyles.flexContainer,
          }}
          onClick={toggleMute}
        >
          <ImageProtector />
          <WinButtonDecorations />
          <img
            style={commonStyles.image}
            alt={isMuted || volume === 0 ? "mute" : "volume"}
            src={isMuted || volume === 0 ? "/mute.png" : "/volume.png"}
          />
        </div>
        <div
          style={{
            gridArea: "1 / 4 / 2 / 5",
            backgroundColor: "#c3c3c3",
            ...commonStyles.flexContainer,
          }}
          onClick={() => appWindow.close()}
        >
          <WinButtonDecorations />
          <ImageProtector />
          <img style={commonStyles.image} alt="close" src="/close.png" />
        </div>
        <div
          style={{
            gridArea: "2 / 1 / 3 / 5",
            ...commonStyles.flexContainer,
          }}
        >
          <ImageProtector />

          <img style={commonStyles.image} alt="fish bg" src="/fish_bg.png" />
          <SingleFish
            fishAttributes={{
              assetUrl: "/fish_1.png",
              width: 214,
              height: 116,
              speed: { x: 0.2, y: 0.2 },
            }}
            arenaWidth={504}
            arenaHeight={336}
          />
          <SingleFish
            fishAttributes={{
              assetUrl: "/fish_2.png",
              width: 146,
              height: 74,
              speed: { x: 0.3, y: 0.15 },
            }}
            arenaWidth={504}
            arenaHeight={336}
          />
          <SingleFish
            fishAttributes={{
              assetUrl: "/fish_2.png",
              width: 144,
              height: 62,
              speed: { x: 0.32, y: 0.18 },
            }}
            arenaWidth={504}
            arenaHeight={336}
          />
        </div>
      </div>
    </div>
  );
}

const commonStyles: Record<string, React.CSSProperties> = {
  flexContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    imageRendering: "pixelated",
    transform: "scale(2)",
  },
};

export default App;
