import colorName from "color-name";

export const isColorName = (name: string) => {
  return Object.keys(colorName).includes(name);
};

export const isHex = (color: string) => {
  return /^#([0-9a-fA-F\d]{6}|[0-9a-fA-F\d]{3})$/.test(color);
};

export const isRgb = (color: string) => {
  return /rgb\((0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2})\)/.test(
    color
  );
};

export const isRgba = (color: string) => {
  return /rgba\((0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),((?:0?\.\d+)|1)(?=\))/.test(
    color
  );
};

export const isColor = (color: string) => {
  return isColorName(color) || isHex(color) || isRgb(color) || isRgba(color);
};
