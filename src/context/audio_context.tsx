import React, { ReactNode, useEffect, useRef, useState } from "react";
import { isDebug } from "../utils/debug";

type Song = "GYMN_1_.ROL" | "GYMN_2_.ROL" | "GYMN_3_.ROL";
type Behavior = "loop_queue" | "loop_single" | "play_queue";

interface AudioContextState {
  volume: number;
  isMuted: boolean;
  progress: number;
  paused: boolean;
  currentBehavior: Behavior;
  queue: Song[];
}

interface AudioContextActions {
  toggleMute: () => unknown;
  changeSong: (newSong: Song) => unknown;
  updateVolume: (newVolue: number) => unknown;
}

interface AudioContext {
  state: AudioContextState;
  actions: AudioContextActions;
}

const audioDefaultContextState: AudioContextState = {
  queue: ["GYMN_1_.ROL", "GYMN_2_.ROL", "GYMN_3_.ROL"],
  isMuted: isDebug,
  progress: 0,
  volume: 0.6,
  currentBehavior: "loop_queue",
  paused: false,
};

const audioDefaultContextActions: AudioContextActions = {
  changeSong: () => 0,
  toggleMute: () => 0,
  updateVolume: () => 0,
};

export const AudioContextReact = React.createContext<AudioContext>({
  actions: audioDefaultContextActions,
  state: audioDefaultContextState,
});

export const AudioContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AudioContextState>(
    audioDefaultContextState
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => {
    if (state.volume === 0) updateVolume(0.2);
    else setState((oldState) => ({ ...oldState, isMuted: !oldState.isMuted }));
  };

  const changeSong = (_song: Song) => 0;

  const moveProgress = (newProgress: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = audioRef.current.duration * newProgress;
  };

  const updateVolume = (newValue: number) => {
    const clampedValue =
      Math.round(Math.min(Math.max(newValue, 0), 1) * 10) / 10;

    setState((oldState) => ({
      ...oldState,
      volume: clampedValue,
      isMuted: clampedValue > 0 && oldState.isMuted ? true : oldState.isMuted,
    }));
  };

  const onSongEnd = () => {
    switch (state.currentBehavior) {
      case "loop_queue":
        setState((oldState) => {
          const [finishedSong, ...restOfQueue] = oldState.queue;
          return {
            ...oldState,
            queue: [...restOfQueue, finishedSong],
          };
        });
        break;
      case "loop_single":
        moveProgress(0);
        break;
      case "play_queue":
        setState((oldState) => {
          const [, ...restOfQueue] = oldState.queue;
          return {
            ...oldState,
            queue: [...restOfQueue],
          };
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.volume;
  }, [state]);

  return (
    <AudioContextReact.Provider
      value={{ state, actions: { toggleMute, changeSong, updateVolume } }}
    >
      <audio
        ref={audioRef}
        src={`/songs/${state.queue[0]}.mp3`}
        autoPlay
        typeof="audio/ogg"
        onEnded={onSongEnd}
        onError={(err) => console.error(err)}
        onTimeUpdate={({ currentTarget: { duration, currentTime } }) =>
          setState((oldState) => ({
            ...oldState,
            progress: currentTime / duration,
          }))
        }
        muted={state.isMuted}
      />
      {children}
    </AudioContextReact.Provider>
  );
};
