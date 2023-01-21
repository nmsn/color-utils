import {
  mix2Color,
  color2Color,
  calcComplementaryColor,
  hsla2Modal,
  modal2Hsla,
} from "../utils/transform";

describe("test transform functions", () => {
  it("mix2Color", () => {
    expect(mix2Color(["rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)"], "rgb")).toBe(
      "rgba(127.5, 127.5, 127.5, 0.5)"
    );

    expect(mix2Color(["rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)"], "hex")).toBe(
      "#80808080"
    );

    expect(mix2Color(["rgba(1,2,3,0.5)", "rgba(111,222,111,0.5)"], "hex")).toBe(
      "#38703980"
    );

    expect(mix2Color(["rgb(0,0,0)", "rgb(255,255,255)"], "rgb")).toBe(
      "rgb(127.5, 127.5, 127.5)"
    );

    expect(mix2Color(["rgb(85, 36, 36)", "rgb(87, 49, 49)"], "rgb")).toBe(
      "rgb(86, 42.5, 42.5)"
    );
  });

  it("color2Color", () => {
    expect(color2Color("rgba(0,0,0,0.5)")).toBe("#00000080");
    expect(color2Color("rgba(255,255,255,0.5)")).toBe("#ffffff80");
    expect(color2Color("#fff")).toBe("rgb(255, 255, 255)");
    expect(() => color2Color("#1")).toThrowError(
      "Param is not a valid color string."
    );
    expect(color2Color("white", "hex")).toBe("#ffffff");
    expect(color2Color("white", "rgb")).toBe("rgb(255, 255, 255)");
  });

  it("calcComplementaryColor", () => {
    expect(calcComplementaryColor("rgba(0,0,0,1)")).toBe("#ffffff");
    expect(calcComplementaryColor("rgba(255,255,255,1)")).toBe("#000000");
    expect(calcComplementaryColor("rgb(0,0,0)")).toBe("#ffffff");
    expect(calcComplementaryColor("rgb(255,255,255)")).toBe("#000000");
    expect(calcComplementaryColor("rgb(67, 12.5, 12.5)", "rgb")).toBe(
      "rgb(188, 242.5, 242.5)"
    );
    expect(calcComplementaryColor("rgba(67, 12.5, 12.5, 0.5)", "rgb")).toBe(
      "rgba(188, 242.5, 242.5, 0.5)"
    );
  });

  it("hsla2Modal", () => {
    expect(hsla2Modal("hsl(0 ,0, 0)")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hsla2Modal("hsl(360, 0, 1)")).toEqual({
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    });
    expect(hsla2Modal("hsla(180, 0.5, 0.5, 1)")).toEqual({
      r: 63.75,
      g: 191.25,
      b: 191.25,
      a: 1,
    });
  });

  it("modal2Hsla", () => {
    expect(modal2Hsla({ r: 0, g: 0, b: 0, a: 1 })).toBe("hsl(0, 0, 0)");
    expect(modal2Hsla({ r: 255, g: 255, b: 255, a: 1 })).toBe("hsl(0, 0, 1)");
    expect(modal2Hsla({ r: 252, g: 186, b: 3, a: 1 })).toBe("hsl(44.1, 0.98, 0.5)");
  });
});
