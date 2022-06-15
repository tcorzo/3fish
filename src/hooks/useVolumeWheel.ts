import { useCallback, useContext, useEffect } from "react";
import { AudioContextReact } from "../context/audio_context";

export const useVolumeWheel = () => {
  const { actions, state } = useContext(AudioContextReact);

  const onVolumeWheel = useCallback(
    (evt: WheelEvent) => {
      const scrollUp = evt.deltaY < 0;
      if (state.volume > 1 && scrollUp) return;
      if (state.volume < 0 && !scrollUp) return;
      actions.updateVolume(state.volume + (scrollUp ? 0.1 : -0.1));
    },
    [actions, state.volume]
  );

  useEffect(() => {
    window.addEventListener("wheel", onVolumeWheel);
    return () => {
      window.removeEventListener("wheel", onVolumeWheel);
    };
  }, [onVolumeWheel]);
};
