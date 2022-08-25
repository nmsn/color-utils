import { ColorModelType, DEFAULT_MODEL } from "./constant";

export const mix2ModelColors = (
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

/**
 * 广义上的互补色
 * 黑白/色环
 */
export const calcComplementaryColor = (
  color: ColorModelType
): ColorModelType => {
  const { r, g, b, a } = color;

  return {
    r: 255 - r,
    g: 255 - g,
    b: 255 - b,
    a,
  };
};
