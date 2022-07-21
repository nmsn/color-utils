import * as colorName from "color-name";
import { removeRgbaBlank } from "./transform";

const isColorName = (name: string) => {
  return Object.keys(colorName).includes(name);
};

const isHex = (color: string) => {
  return /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/.test(color);
};

const isRgb = (color: string) => {
  return /rgb\((0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2})\)/.test(
    removeRgbaBlank(color)
  );
};

const isRgba = (color: string) => {
  return /rgba\((0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),(0|1\d{0,2}|2[0-5]{2}),((?:0?\.\d+)|1)(?=\))/.test(
    removeRgbaBlank(color)
  );
};

const isColor = (color: string) => {
  return isColorName(color) || isHex(color) || isRgb(color) || isRgba(color);
};

export { isColorName, isHex, isRgb, isRgba, isColor };
