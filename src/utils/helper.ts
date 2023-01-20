import { isHex, isRgba, isRgb } from "./validator";

export const removeRgbaBlank = (color: string) => {
  return color?.replace(/\s+/g, "") || "";
};

export const getColorType = (color: string) => {
  if (isHex(color)) return "hex";
  if (isRgb(color)) return "rgb";
  if (isRgba(color)) return "rgba";

  return "";
};

export const getHslArr = (color: string) => {
  const regex = /^hsl\((\S+),(\S+),(\S+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);

  if (!Array.isArray(result)) {
    return [];
  }

  return result?.slice(1).map(Number);
};

export const getHslaArr = (color: string) => {
  const regex = /^rgba\((\S+),(\S+),(\S+),(\S+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);

  if (!Array.isArray(result)) {
    return [];
  }

  return result?.slice(1).map(Number);
};
