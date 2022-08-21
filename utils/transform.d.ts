declare type ColorModelType = {
    r: number;
    g: number;
    b: number;
    a: number;
};
declare const mix2Color: (colors: string[], type: "rgb" | "hex", amount?: number[]) => string;
declare const color2Model: (color: string) => ColorModelType;
declare const color2Color: (color: string, type?: "rgb" | "hex") => string | ((color: string) => string);
export { mix2Color, color2Model, color2Color };
