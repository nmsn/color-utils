import { isColorName, isHex, isRgb, isRgba, isColor } from "../utils/validator";

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
    expect(isRgb("rgb(0, 0, 0)")).toBeTruthy();
  });

  it("param is valid rgba string", () => {
    expect(isRgba("rgba(255,255,255,1)")).toBeTruthy();
    expect(isRgba("rgba(0, 0, 0, 1)")).toBeTruthy();
  });

  it("param is valid color", () => {
    expect(isColor("white")).toBeTruthy();
    expect(isColor("#000000")).toBeTruthy();
    expect(isColor("rgb(255, 255, 255)")).toBeTruthy();
    expect(isColor("rgba(255, 255, 255, 1)")).toBeTruthy();
  });
});
