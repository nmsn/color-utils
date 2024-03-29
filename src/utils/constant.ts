export type ColorModelType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const DEFAULT_MODEL = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

export type ColorType = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "name";

export type OptionalColorType = Exclude<ColorType, "rgba" | "hsla">;
