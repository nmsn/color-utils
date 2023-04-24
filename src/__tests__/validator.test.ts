import { isColorName, isHex, isRgb, isRgba, isColor, isHsl, isHsla } from "../utils/validator";

describe("test validator functions", () => {
  it("param is valid color name", () => {
    expect(isColorName("white")).toBeTruthy();
  });

  it("param is valid color hex", () => {
    expect(isHex("#fff")).toBeTruthy();
    expect(isHex("#000000")).toBeTruthy();
  });

  it("param is valid rgb string", () => {
    expect(isRgb("rgb(255,255,255)")).toBeTruthy();
    expect(isRgb("rgb(0,0,0)")).toBeTruthy();
    expect(isRgb("rgb(1,2,3)")).toBeTruthy();
    expect(isRgb("rgb(111,222,111)")).toBeTruthy();
  });

  it("param is valid rgba string", () => {
    expect(isRgba("rgba(255,255,255,1)")).toBeTruthy();
    expect(isRgba("rgba(0,0,0,1)")).toBeTruthy();
    expect(isRgba("rgba(1,2,3,1)")).toBeTruthy();
    expect(isRgba("rgba(111,222,111,1)")).toBeTruthy();
    expect(isRgba("rgba(1,2,3,0.1)")).toBeTruthy();
    expect(isRgba("rgba(111,222,111,0.1)")).toBeTruthy();
  });

  it("param is valid color", () => {
    expect(isColor("white")).toBeTruthy();
    expect(isColor("#000000")).toBeTruthy();
    expect(isColor("rgb(255,255,255)")).toBeTruthy();
    expect(isColor("rgba(255,255,255,1)")).toBeTruthy();
  });
  
  
  it("param is valid hsl color", () => {
    expect(isHsl("hsl(0,0,0)")).toBeTruthy();
    expect(isHsl("hsl(360,0.5,0.5)")).toBeTruthy();
    expect(isHsl("hsl(370,1,1)")).toBeFalsy();
    expect(isHsl("hsla(1,1,1,1)")).toBeFalsy();
  });
  
  
  it("param is hsla color", () => {
    expect(isHsla("hsla(0,0,0,0)")).toBeTruthy();
    expect(isHsla("hsla(360,0.5,0.5,0.5)")).toBeTruthy();
    expect(isHsla("hsla(370,1,1,1)")).toBeFalsy();
    expect(isHsla("hsla(1,1,1,1)")).toBeTruthy();
  });
});
