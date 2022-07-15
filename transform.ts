import { isColor, isColorName, isHex, isRgb, isRgba } from "./validator";
import colorName from "color-name";

type ColorModelType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const formatColorNameToRgb = (name: string) => {
  const [r, g, b] = colorName[name];
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
  const result = (isRgba(color) ? color?.substring(5) : color.substring(4))
    .split(")")[0]
    .split(",");
  const [r, g, b, a] = result?.map(Number);

  return { r, g, b, a };
};

const hexAdd0 = (hex: string) => {
  return hex.padStart(2, "0");
};

export const model2Hex = (color: ColorModelType): string => {
  const { r, g, b, a } = color;
  const rHex = hexAdd0(Math.round(r).toString(16));
  const gHex = hexAdd0(Math.round(g).toString(16));
  const bHex = hexAdd0(Math.round(b).toString(16));
  const aHex = hexAdd0(Math.round(a * 255).toString(16));

  return `#${rHex}${gHex}${bHex}${aHex === "00" ? "" : aHex}`;
};

export const modal2Hex = (color: ColorModelType): string => {
  const { r, g, b, a } = color;
  return `${a === 1 ? "rgb" : "rgba"}(${r}, ${g},${b}${
    a === 1 ? "" : `, ${a}`
  })`;
};

export const getColorModel = (color: string) => {
  if (!isColor(color)) {
    return {};
  }

  if (isHex(color)) {
    return hex2Model(color);
  }

  if (isColorName(color)) {
    return rgba2Model(formatColorNameToRgb(color));
  }

  if (isRgb(color) || isRgba(color)) {
    return rgba2Model(color);
  }
};
