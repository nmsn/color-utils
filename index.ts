import { composite } from "color-composite";
import { composite2Modal } from "./transform";

const getMixColor = () => {};

const mix2Model = (colors: string[]) => {
  const result = composite(colors);
  return composite2Modal(result);
};

const mix2Hex = (colors: string[]) => {
  const model = mix2Model(colors);
};

const mix2Rgba = (colors: string[]) => {
  const model = mix2Model(colors);
};
