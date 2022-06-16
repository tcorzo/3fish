import React from "react";

export const TitleBarButton = ({
  onClick,
  imageFilename,
  hasShine,
  className,
}: {
  onClick: () => unknown;
  imageFilename: string;
  hasShine?: boolean;
  className?: string;
}): React.ReactElement => {
  return (
    <button
      className={`flex-container old-button ${className}`}
      onClick={onClick}
    >
      <ProtectedImage
        alt={imageFilename}
        src={`/images/${imageFilename}.png`}
      />
      {/* <WinButtonDecorations /> */}
      {hasShine ? (
        <>
          <div className="shine" />
          <div className="shade" />
        </>
      ) : null}
    </button>
  );
};

type ProtectedImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const ProtectedImage = (
  props: ProtectedImageProps
): React.ReactElement => (
  <>
    <img alt="no-alt" {...props} />
    <div className="h-full w-full absolute z-30" />
  </>
);
