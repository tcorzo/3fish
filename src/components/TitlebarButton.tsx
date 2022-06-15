import { WinButtonDecorations } from "./WinButtonDecorations";

export const TitlebarButton = ({
  onClick,
  imageFilename,
}: {
  onClick: () => unknown;
  imageFilename: string;
}) => {
  return (
    <button
      className="row-span-1 col-span-1 bg-grey flex-container"
      onClick={onClick}
    >
      <img alt={imageFilename} src={`/images/${imageFilename}.png`} />
      <WinButtonDecorations />
    </button>
  );
};
