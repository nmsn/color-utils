import * as colorName from "color-name";
import { removeRgbaBlank, getHslArr, getHslaArr } from "./helper";

const isColorName = (name: string) => {
  return Object.keys(colorName).includes(name);
};

const isHex = (color: string) => {
  return /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/.test(color);
};

const isRgb = (color: string) => {
  const regex = /^rgb\((\S+),(\S+),(\S+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);
  if (!Array.isArray(result)) {
    return false;
  }

  const rgba = result?.slice(1);

  return rgba?.every((item) => +item >= 0 && +item <= 256);
};

const isRgba = (color: string) => {
  const regex = /^rgba\((\S+),(\S+),(\S+),(\S+)\)/;
  const result = removeRgbaBlank(color)?.match(regex);

  if (!Array.isArray(result)) {
    return false;
  }

  const rgb = result?.slice(1, 4);
  const opacity = result?.[4];

  return (
    rgb?.every((item) => +item >= 0 && +item <= 256) &&
    +opacity >= 0 &&
    +opacity <= 1
  );
};

const isHsl = (color: string) => {
  const [h, s, l] = getHslArr(color);

  return h >= 0 && h <= 360 && s >= 0 && s <= 1 && l >= 0 && l <= 1;
};

const isHsla = (color: string) => {
  const [h, s, l, a] = getHslaArr(color);

  return (
    h >= 0 &&
    h <= 360 &&
    s >= 0 &&
    s <= 1 &&
    l >= 0 &&
    l <= 1 &&
    a >= 0 &&
    a <= 1
  );
};

const isColor = (color: string) => {
  return (
    isColorName(color) ||
    isHex(color) ||
    isRgb(color) ||
    isRgba(color) ||
    isHsl(color) ||
    isHsla(color)
  );
};

export { isColorName, isHex, isRgb, isRgba, isHsl, isHsla, isColor };
