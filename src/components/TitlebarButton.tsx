import React from "react";

export const TitlebarButton = ({
  onClick,
  imageFilename,
}: {
  onClick: () => unknown;
  imageFilename: string;
}): React.ReactElement => {
  return (
    <button
      className="row-span-1 col-span-1 flex-container  old-button"
      onClick={onClick}
    >
      <ProtectedImage
        alt={imageFilename}
        src={`/images/${imageFilename}.png`}
      />
      {/* <WinButtonDecorations /> */}
    </button>
  );
};

type ProtectedImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const ProtectedImage = (props: ProtectedImageProps): React.ReactElement => (
  <>
    <img alt="no-alt" {...props} />
    <div className="h-full w-full absolute z-30" />
  </>
);
