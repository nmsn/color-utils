import { isColor, isColorName, isHex, isRgb, isRgba } from "./validator";

type ColorModelType = {
  r: number;
  g: number;
  b: number;
  a: number;
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
  const result = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/i.exec(
    formatHex(color)
  );
  return result
    ? {
        r: hexToDecimal(result[1]),
        g: hexToDecimal(result[2]),
        b: hexToDecimal(result[3]),
        a: result[4] ? +((hexToDecimal(result[4]) / 255).toFixed(2)) : 1,
      }
    : { r: 0, g: 0, b: 0, a: 0 };
}


const rgba2Model = (color: string): ColorModelType => {
  const result = (isRgba(color) ? color?.substring(5) : color.substring(4)).split(")")[0].split(',');
  const [r,g,b,a] = result?.map(Number);
  
  return { r,g,b,a };
};

const rgb2Hex = (color: ColorModelType): string {
  const { r, g, b } = color;
  let rr = Math.round(r).toString(16);
  let gg = Math.round(g).toString(16);
  let bb = Math.round(b).toString(16);

  rr = rr.length === 1 ? "0" + rr : rr;
  gg = gg.length === 1 ? "0" + gg : gg;
  bb = bb.length === 1 ? "0" + bb : bb;

  return "#" + rr + gg + bb;
}



const getColorModel = (color: string) => {
  if (!isColor(color)) {
    return {};
  }

  if (isHex(color)) {
  }

  if (isColorName(color)) {
  }

  if (isRgb(color)) {
  }

  if (isRgba(color)) {
  }
};
