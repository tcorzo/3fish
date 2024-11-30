export type Vector = { x: number; y: number, z: number };

export interface FishAttributes {
  assetUrl: string;
  speed: Vector;
  height: number;
  width: number;
}

export interface Fish extends FishAttributes {
  position: Vector;
  direction: Vector;
  ref: HTMLDivElement | null;
  refImg: HTMLImageElement | null;
  minDistance: number;
}
