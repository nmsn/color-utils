import { isHex, isRgba, isRgb } from "./validator";
import { color2Model, model2HslaModel } from "./transform";

export const removeColorStrBlank = (color: string) => {
  return color?.replace(/\s+/g, "") || "";
};

export const getColorType = (color: string) => {
  if (isHex(color)) return "hex";
  if (isRgb(color)) return "rgb";
  if (isRgba(color)) return "rgba";

  return "";
};

export const toValidNumber = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const isLight = (color: string) => {
  const model = color2Model(color);
  const hslaModel = model2HslaModel(model);
  const { l: light } = hslaModel;
  return light >= 0.5;
};
