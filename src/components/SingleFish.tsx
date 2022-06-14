import { useCallback, useEffect, useRef, useState } from "react";

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

interface Vector {
  x: number;
  y: number;
}

interface FishAttributes {
  height: number;
  width: number;
  assetUrl: string;
  speed: Vector;
}

interface Fish extends FishAttributes {
  x: number;
  y: number;
  momentum: Vector;
}

export const SingleFish = ({
  arenaHeight,
  arenaWidth,
  fishAttributes,
}: {
  arenaHeight: number;
  arenaWidth: number;
  fishAttributes: FishAttributes;
}): React.ReactElement => {
  const randomizeFishValues = (attr: FishAttributes): Fish => ({
    ...attr,
    y: randomInt(0, arenaHeight - attr.height),
    x: randomInt(0, arenaWidth - attr.width),
    momentum: {
      x: Math.random() > 0.5 ? 1 : -1,
      y: Math.random() > 0.5 ? 1 : -1,
    },
  });

  const [animationStarted, setAnimationStarted] = useState(false);

  const fish = useRef<Fish>(randomizeFishValues(fishAttributes));
  const [canRandomlyChangeDirection, setCanRandomlyChangeDirection] =
    useState(false);

  const element = useRef<HTMLDivElement>(null);

  const updateFish = useCallback(
    (fish: Fish, dt: number) => {
      const maxX = arenaWidth - fish.width;
      const maxY = arenaHeight - fish.height;
      fish.x += fish.momentum.x * fish.speed.x;
      fish.y += fish.momentum.y * fish.speed.y;
      if (fish.x > maxX) fish.momentum.x = -1;
      if (fish.x < 0) fish.momentum.x = 1;
      if (fish.y > maxY) fish.momentum.y = -1;
      if (fish.y < 0) fish.momentum.y = 1;
      if (element.current) {
        element.current.style.cssText += `transform: translate3d(${fish.x}px, ${
          fish.y
        }px, 0) scaleX(${fish.momentum.x > 0 ? "1" : "-1"})`;
      }
    },
    [arenaHeight, arenaWidth]
  );

  const randomlyChangeDirection = () => {
    fish.current.momentum = {
      x: Math.random() > 0.5 ? 1 : -1,
      y: Math.random() > 0.5 ? 1 : -1,
    };
  };

  const update = useCallback(
    (dt: number) => {
      updateFish(fish.current, dt);
    },
    [updateFish]
  );

  const draw: FrameRequestCallback = useCallback(
    (time) => {
      if (!animationStarted) setAnimationStarted(true);
      requestAnimationFrame(draw);
      update(time);
    },
    [update, animationStarted]
  );

  useEffect(() => {
    if (canRandomlyChangeDirection) {
      setCanRandomlyChangeDirection(false);
      if (Math.random() > 0.6) randomlyChangeDirection();
      setTimeout(
        () => setCanRandomlyChangeDirection(true),
        randomInt(2000, 12000)
      );
    }
  }, [canRandomlyChangeDirection]);

  useEffect(() => {
    if (!animationStarted) {
      draw(0);
      setTimeout(
        () => setCanRandomlyChangeDirection(true),
        randomInt(2000, 8000)
      );
    }
  }, [draw, animationStarted]);

  return (
    <div
      ref={element}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `scaleX(${fish.current.momentum.x > 0 ? "1" : "-1"})`,
        height: fishAttributes.height,
        width: fishAttributes.width,
        backgroundColor: canRandomlyChangeDirection ? "red" : "transparent",
      }}
    >
      <img
        style={{ imageRendering: "pixelated" }}
        height={fishAttributes.height}
        width={fishAttributes.width}
        alt="first fish"
        src={fishAttributes.assetUrl}
      />
    </div>
  );
};
