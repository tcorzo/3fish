import { WinButtonDecorations } from "./WinButtonDecorations";

export const VolumeIndicator = ({
  isVolumeVisible,
  volume,
}: {
  isVolumeVisible: boolean;
  volume: number;
}): React.ReactElement => (
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
    {new Array(Math.floor(volume * 20)).fill(0).map((_, i) => (
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
