import React, { useEffect, useRef, useState } from "react";
import { Fish, FishAttributes, Vector } from "../types/fish_types";

const FPS = 24;
const INTERVAL = 1000 / FPS;

const getRandomSign = (): 1 | -1 => (Math.round(Math.random()) ? 1 : -1);
const getRandomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * max) + min;

const arenaSize: Vector = {
  x: 504,
  y: 336,
  z: 20,
};

const fishAttributesToFish = (attr: FishAttributes): Fish => ({
  ...attr,
  direction: {
    x: getRandomSign(),
    y: getRandomSign(),
    z: 0,
  },
  position: {
    x: getRandomBetween(0, arenaSize.x),
    y: getRandomBetween(0, arenaSize.y),
    z: getRandomBetween(0, arenaSize.z),
  },
  ref: null,
  refImg: null,
  minDistance: Math.sqrt((attr.width/2)**2 + (attr.height/2)**2)
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
      
      // Function to calculate the distance between two fishes
      const calculateDistance = (fish: Fish, otherFish: Fish) => {
        const dx = fish.position.x - otherFish.position.x;
        const dy = fish.position.y - otherFish.position.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      
      // Check distance from other fishes
      let isFarEnough = true;
      fishes.forEach(otherFish => {
        if (otherFish !== fish) {
          const distance = calculateDistance(fish, otherFish);
          const minDistance = fish.minDistance + otherFish.minDistance;
          if (distance < minDistance) {
            isFarEnough = false;
          }
        }
      });

      if (isFarEnough) {
        fish.position.z = getRandomBetween(0, arenaSize.z); // Assign a random z value
      }

      if (fish.ref && fish.refImg) {
        fish.ref.style.cssText += `transform: translateX(${fish.position.x}px) translateY(${fish.position.y}px);`;

        fish.ref.style.zIndex = String(fish.position.z);
        fish.refImg.style.zIndex = String(fish.position.z);

        fish.refImg.style.cssText += `transform: scaleX(${fish.direction.x});`;
      }
    };
    
    const update = (dt: number) => {
      fishes.forEach((fish) => {
        moveFish(fish, dt);
      });
    };
    
    const render: FrameRequestCallback = (_time) => {
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
    <div className="h-[336px] w-[504px]">
      {fishes.map((fish, i) => (
        <div
          className={`left-0 top-0 absolute transition-[${INTERVAL}ms_linear]`}
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
      <img src="/fish_assets/fish_bg.png" alt="bg" />
    </div>
  );
};
