import { isHex, isRgba, isRgb } from "./validator";

export const removeRgbaBlank = (color: string) => {
  return color.replace(/\s+/g, "");
};

export const getColorType = (color: string) => {
  if (isHex(color)) return "hex";
  if (isRgb(color)) return "rgb";
  if (isRgba(color)) return "rgba";

  return "";
};
