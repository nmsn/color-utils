/** 当前只用的到 rgb 类型 */
type ColorCompositeType = {
  space: "rgb";
  values: [number, number, number];
  alpha: number;
};

declare module "color-composite" {
  export const composite: (colors: string[]) => ColorCompositeType;
}
