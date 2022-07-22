import { composite } from "color-composite";
import { default as colorName, RGB } from "color-name";
import { isColor, isColorName, isHex, isRgb, isRgba } from "./validator";

type ColorModelType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type ColorNameType = {
  [key: string]: RGB;
};

/** 当前只用的到 rgb 类型 */
type ColorCompositeType = {
  space: "rgb";
  values: [number, number, number];
  alpha: number;
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

  return `#${rHex}${gHex}${bHex}${aHex === "00" ? "" : aHex}`;
};

const model2Rgba = (color: ColorModelType): string => {
  const { r, g, b, a } = color;
  return `${a === 1 ? "rgb" : "rgba"}(${r}, ${g}, ${b}${
    a === 1 ? "" : `, ${a}`
  })`;
};

const composite2Modal = (color: ColorCompositeType): ColorModelType => {
  const {
    values: [r, g, b],
    alpha,
  } = color;

  return { r, g, b, a: alpha };
};

const mix2Model = (colors: string[]) => {
  const result = composite(colors);
  return composite2Modal(result);
};

const mix2Hex = (colors: string[]) => {
  const model = mix2Model(colors);

  return model2Hex(model);
};

const mix2Rgba = (colors: string[]) => {
  const model = mix2Model(colors);
  return model2Rgba(model);
};

const mix2Color = (colors: string[], type: "rgb" | "hex") => {
  if (type === "rgb") {
    return mix2Rgba(colors);
  }

  if (type === "hex") {
    return mix2Hex(colors);
  }

  return "";
};

const rgba2Hex = (color: string) => {
  return model2Hex(rgba2Model(color));
};

const hex2Rgba = (color: string) => {
  return model2Rgba(hex2Model(color));
};

const color2Color = (color: string, type?: "rgb" | "hex") => {
  if (!isColor(color)) {
    return "";
  }

  if (isRgb(color) || isRgba(color)) {
    return rgba2Hex(color);
  }

  if (isColorName(color)) {
    const model = rgba2Model(formatColorName2Rgb(color));
    return type === "rgb" ? model2Rgba(model) : model2Hex(model);
  }

  if (isHex(color)) {
    return hex2Rgba(color);
  }

  return hex2Rgba;
};

export { mix2Color, color2Color };