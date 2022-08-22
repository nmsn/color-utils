import { default as colorName, RGB } from "color-name";
import { isColor, isColorName, isHex, isRgb, isRgba } from "./validator";

type ColorModelType = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const DEFAULT_MODEL = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
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

const mix2ModelColors = (
  colors: ColorModelType[],
  amount?: number[]
): ColorModelType => {
  let actualAmount: number[] = [];
  if (Array.isArray(amount) && amount?.length) {
    const sum = amount.reduce((sum, cur) => sum + cur);

    // FIXME 比例校验逻
    if (sum !== 1) {
      return DEFAULT_MODEL;
    }

    actualAmount = amount;
  } else {
    actualAmount = Array(colors?.length).fill(1 / colors?.length);
  }

  const result = { ...DEFAULT_MODEL };

  colors.forEach((item, index) => {
    result.r += item.r * actualAmount?.[index] || 0;
    result.g += item.g * actualAmount?.[index] || 0;
    result.b += item.b * actualAmount?.[index] || 0;
    result.a += item.a * actualAmount?.[index] || 0;
  });

  return result;
};

const mix2Color = (
  colors: string[],
  type: "rgb" | "hex",
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

const color2Model = (color: string) => {
  if (isHex(color)) {
    return hex2Model(color);
  }

  if (isRgba(color) || isRgb(color)) {
    return rgba2Model(color);
  }

  if (isColorName(color)) {
    return rgba2Model(formatColorName2Rgb(color));
  }

  return DEFAULT_MODEL;
};

const model2Color = (color: ColorModelType, type: "rgb" | "hex"): string => {
  if (type === "rgb") {
    return model2Rgba(color);
  }

  if (type === "hex") {
    return model2Hex(color);
  }

  return "";
};

const color2Color = (color: string, type?: "rgb" | "hex") => {
  if (!isColor(color)) {
    return "";
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

export { mix2Color, color2Model, color2Color, model2Color };
