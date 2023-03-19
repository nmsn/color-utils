import { default as colorName, RGB } from "color-name";
import {
  isColor,
  isColorName,
  isHex,
  isRgb,
  isRgba,
  isHsl,
  isHsla,
} from "./validator";
import { ColorModelType, DEFAULT_MODEL, OptionalColorType } from "./constant";
import { mix2ModelColors, calcComplementaryModel } from "./calc";
import { getHslArr, getHslaArr } from "./validator";
import { toValidNumber } from "./helper";

type ColorNameType = {
  [key: string]: RGB;
};

const formatColorName2Rgb = (name: string) => {
  const [r, g, b] = (colorName as ColorNameType)[name];
  return `rgb(${r},${g},${b})`;
};

const formatTo6DigitHex = (hex: string) => {
  return hex.replace(
    /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/,
    "#$1$1$2$2$3$3"
  );
};

const formatHex = (hex: string) => {
  if (hex?.length === 4) {
    return formatTo6DigitHex(hex);
  }

  return hex;
};

const hexToDecimal = (hex: string) => parseInt(hex, 16);

const hex2Model = (color: string): ColorModelType => {
  const result =
    /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/i.exec(
      formatHex(color)
    );
  return result
    ? {
        r: hexToDecimal(result[1]),
        g: hexToDecimal(result[2]),
        b: hexToDecimal(result[3]),
        a: result[4] ? +(hexToDecimal(result[4]) / 255).toFixed(2) : 1,
      }
    : { r: 0, g: 0, b: 0, a: 0 };
};

const rgba2Model = (color: string): ColorModelType => {
  // TODO isRgb
  const result = (isRgba(color) ? color?.substring(5) : color.substring(4))
    .split(")")[0]
    .split(",");
  const [r, g, b, a = 1] = result?.map(Number);
  return { r, g, b, a };
};

const hexAdd0 = (hex: string) => {
  return hex.padStart(2, "0");
};

const model2Hex = (color: ColorModelType): string => {
  const { r, g, b, a } = color;
  const rHex = hexAdd0(Math.round(r).toString(16));
  const gHex = hexAdd0(Math.round(g).toString(16));
  const bHex = hexAdd0(Math.round(b).toString(16));
  const aHex = hexAdd0(Math.round(a * 255).toString(16));

  return `#${rHex}${gHex}${bHex}${aHex === "ff" ? "" : aHex}`;
};

const model2Rgba = (color: ColorModelType): string => {
  const { r, g, b, a } = color;
  return `${a === 1 ? "rgb" : "rgba"}(${r}, ${g}, ${b}${
    a === 1 ? "" : `, ${a}`
  })`;
};

export const mix2Color = (
  colors: string[],
  type: OptionalColorType,
  amount?: number[]
) => {
  const models = colors?.map((item) => color2Model(item));
  const mixResult = mix2ModelColors(models, amount);
  return model2Color(mixResult, type);
};

export const color2Model = (color: string) => {
  if (isHex(color)) {
    return hex2Model(color);
  }

  if (isRgba(color) || isRgb(color)) {
    return rgba2Model(color);
  }

  if (isHsla(color) || isHsl(color)) {
    return hsla2Model(color);
  }

  if (isColorName(color)) {
    return rgba2Model(formatColorName2Rgb(color));
  }

  // TODO 不符合条件的输出报错
  return DEFAULT_MODEL;
};

export const model2Color = (
  color: ColorModelType,
  type: OptionalColorType = "hex"
): string => {
  if (type === "rgb") {
    return model2Rgba(color);
  }

  if (type === "hex") {
    return model2Hex(color);
  }

  return "";
};

// TODO type conversion
export const color2Color = (color: string, type: OptionalColorType) => {
  if (!isColor(color)) {
    throw new Error("Param is not a valid color string.");
  }

  let tempModel = {} as ColorModelType;

  if (isRgb(color) || isRgba(color)) {
    tempModel = rgba2Model(color);
  }

  if (isColorName(color) && type) {
    tempModel = rgba2Model(formatColorName2Rgb(color));
  }

  if (isHex(color)) {
    tempModel = hex2Model(color);
  }

  if (isHsl(color) || isHsla(color)) {
    tempModel = hsla2Model(color);
  }

  if (Object.keys(tempModel).length === 0) {
    throw new Error("Color is not a valid param.");
  }

  if (type === "hex") {
    return model2Hex(tempModel);
  }

  if (type === "hsl") {
    return model2Hsla(tempModel);
  }

  if (type === "rgb") {
    return model2Rgba(tempModel);
  }

  if (type === "name") {
    return modal2ColorName(tempModel);
  }

  throw new Error("No valid transform result");
};

export const calcComplementaryColor = (
  color: string,
  type?: OptionalColorType
) => {
  const model = color2Model(color);
  const complementaryColorModel = calcComplementaryModel(model);
  return model2Color(complementaryColorModel, type);
};

const hsla2ModelHelper = (h: number, s: number, l: number, a = 1) => {
  const k = (n: number) => (n + h / 30) % 12;
  const x = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - x * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const [r, g, b] = [255 * f(0), 255 * f(8), 255 * f(4), a].map(toValidNumber);
  return {
    r,
    g,
    b,
    a,
  };
};

export const hsla2Model = (color: string) => {
  if (isHsl(color)) {
    const [h, s, l] = getHslArr(color);
    return hsla2ModelHelper(h, s, l);
  } else if (isHsla(color)) {
    const [h, s, l, a] = getHslaArr(color);
    return hsla2ModelHelper(h, s, l, a);
  } else {
    throw new Error("Color is not a valid hsl string");
  }
};

export const model2Hsla = (color: ColorModelType) => {
  const { h, s, l, a } = model2HslaModel(color);

  return `${a === 1 ? "hsl" : "hsla"}(${h}, ${s}, ${l}${
    a === 1 ? "" : `, ${a}`
  })`;
};

export const model2HslaModel = (color: ColorModelType) => {
  let { r, g, b, a } = color;

  r /= 255;
  g /= 255;
  b /= 255;

  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;

  const result = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0,
    (2 * l - s) / 2,
  ].map(toValidNumber);
  return { h: result[0], s: result[1], l: result[2], a };
};

// TODO 增加误差范围的计算
export const modal2ColorName = (color: ColorModelType) => {
  const { r, g, b, a } = color;
  const map = Object.entries(colorName);

  const colorNameItem = map.find(([name, value]) => {
    const [cr, cg, cb] = value;

    return a === 1 && r === cr && g === cg && b === cb;
  });

  if (colorNameItem) {
    return colorNameItem[0];
  }

  return "";
};
