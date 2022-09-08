import * as colorName from "color-name";
import { removeRgbaBlank } from "./helper";

const isColorName = (name: string) => {
  return Object.keys(colorName).includes(name);
};

const isHex = (color: string) => {
  return /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/.test(color);
};

const isRgb = (color: string) => {
  const regex = /^rgb\((\d+),(\d+),(\d+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);
  console.log(result);
  if (!Array.isArray(result)) {
    return false;
  }

  const rgba = result?.slice(1);
  return rgba?.every(
    (item) => Number.isInteger(+item) && +item >= 0 && +item <= 255
  );
};

const isRgba = (color: string) => {
  const regex = /^rgba\((\d+),(\d+),(\d+),(\d+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);

  if (!Array.isArray(result)) {
    return false;
  }

  const rgba = result?.slice(1, 4);
  const opacity = result?.[4];
  return (
    rgba?.every(
      (item) => Number.isInteger(+item) && +item >= 0 && +item <= 255
    ) &&
    +opacity >= 0 &&
    +opacity <= 1
  );
};

const isColor = (color: string) => {
  return isColorName(color) || isHex(color) || isRgb(color) || isRgba(color);
};

export { isColorName, isHex, isRgb, isRgba, isColor };
