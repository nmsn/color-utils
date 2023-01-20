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
import { mix2ModelColors, calcComplementaryModal } from "./calc";
import { getHslArr, getHslaArr } from "./helper";

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

const rgba2Hex = (color: string) => {
  return model2Hex(rgba2Model(color));
};

const hex2Rgba = (color: string) => {
  return model2Rgba(hex2Model(color));
};

export const color2Model = (color: string) => {
  if (isHex(color)) {
    return hex2Model(color);
  }

  if (isRgba(color) || isRgb(color)) {
    return rgba2Model(color);
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
export const color2Color = (color: string, type?: OptionalColorType) => {
  if (!isColor(color)) {
    throw new Error("Param is not a valid color string.");
  }

  if (isRgb(color) || isRgba(color)) {
    return rgba2Hex(color);
  }

  if (isColorName(color) && type) {
    const model = rgba2Model(formatColorName2Rgb(color));
    return model2Color(model, type);
  }

  if (isHex(color)) {
    return hex2Rgba(color);
  }

  return hex2Rgba;
};

export const calcComplementaryColor = (
  color: string,
  type?: OptionalColorType
) => {
  const model = color2Model(color);
  const complementaryColorModel = calcComplementaryModal(model);
  return model2Color(complementaryColorModel, type);
};

const hsla2ModalHelper = (h: number, s: number, l: number, a = 1) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const x = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - x * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4), a];
};

export const hsla2Modal = (color: string) => {
  if (isHsl(color)) {
    const [h, s, l] = getHslArr(color);
    return hsla2ModalHelper(h, s, l);
  } else if (isHsla(color)) {
    const [h, s, l, a] = getHslaArr(color);
    return hsla2ModalHelper(h, s, l, a);
  } else {
    throw new Error("Color is not a valid hsl string");
  }
};

export const modal2Hsla = (color: ColorModelType) => {
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
  ];

  return `${a === 1 ? "rgb" : "rgba"}(${result[0]}, ${result[1]}, ${result[2]}${
    a === 1 ? "" : `, ${a}`
  })`;
};
