import React, { useEffect, useRef, useState } from "react";

const FPS = 24;
const INTERVAL = 1000 / FPS;

type Vector = { x: number; y: number };

interface FishAttributes {
  assetUrl: string;
  speed: Vector;
  height: number;
  width: number;
}

interface Fish extends FishAttributes {
  position: Vector;
  direction: Vector;
  ref: HTMLDivElement | null;
  refImg: HTMLImageElement | null;
}

const getRandomSign = (): 1 | -1 => (Math.round(Math.random()) ? 1 : -1);
const getRandomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * max) + min;

const arenaSize: Vector = {
  x: 504,
  y: 336,
};

const fishAttributesToFish = (attr: FishAttributes): Fish => ({
  ...attr,
  direction: {
    x: getRandomSign(),
    y: getRandomSign(),
  },
  position: {
    x: getRandomBetween(0, arenaSize.x),
    y: getRandomBetween(0, arenaSize.y),
  },
  ref: null,
  refImg: null,
});

export const FishTank = ({
  fishes: fishesAttr,
}: {
  fishes: FishAttributes[];
}): React.ReactElement => {
  const renderRef = useRef<number>(0);
  const now = useRef<number>(Date.now());
  const delta = useRef<number>(Date.now());
  const then = useRef<number>(Date.now());

  const [fishes] = useState(fishesAttr.map(fishAttributesToFish));

  useEffect(() => {
    const moveFish = (fish: Fish, dt: number) => {
      const maxX = arenaSize.x - fish.width;
      const maxY = arenaSize.y - fish.height;

      const clampedDelta = Math.round(Math.min(dt, 100));

      fish.position.y += fish.speed.y * clampedDelta * fish.direction.y;
      fish.position.x += fish.speed.x * clampedDelta * fish.direction.x;

      if (fish.position.y > maxY) {
        fish.position.y = maxY;
        fish.direction.y = -1;
      }
      if (fish.position.y < 0) {
        fish.position.y = 0;
        fish.direction.y = 1;
      }
      if (fish.position.x < 0) {
        fish.position.x = 0;
        fish.direction.x = 1;
      }
      if (fish.position.x > maxX) {
        fish.position.x = maxX;
        fish.direction.x = -1;
      }
      if (fish.ref && fish.refImg) {
        fish.ref.style.cssText += `transform: translateX(${fish.position.x}px) translateY(${fish.position.y}px);`;
        fish.refImg.style.cssText += `transform: scaleX(${fish.direction.x});`;
      }
    };
    const update = (dt: number) => {
      fishes.forEach((fish) => {
        moveFish(fish, dt);
      });
    };

    const render: FrameRequestCallback = (time) => {
      renderRef.current = requestAnimationFrame(render);
      now.current = Date.now();
      delta.current = now.current - then.current;
      if (delta.current > INTERVAL) {
        then.current = now.current - (delta.current % INTERVAL);
        update(delta.current);
      }
    };

    render(0);

    return () => cancelAnimationFrame(renderRef.current);
  }, [fishes]);

  return (
    <div
      style={{
        height: arenaSize.y,
        width: arenaSize.x,
        backgroundColor: "red",
        imageRendering: "pixelated",
      }}
    >
      {fishes.map((fish, i) => (
        <div
          style={{
            left: 0,
            top: 0,
            position: "absolute",
            transition: `${INTERVAL}ms linear`,
          }}
          ref={(ref) => (fish.ref = ref)}
          key={i}
        >
          <img
            ref={(ref) => (fish.refImg = ref)}
            src={fish.assetUrl}
            alt={`fish ${i}`}
          />
        </div>
      ))}
      <img src="/fish_bg.png" alt="bg" />
    </div>
  );
};
