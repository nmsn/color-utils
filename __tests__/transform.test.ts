import { mix2Color, color2Color } from "../src/transform";

describe("test transform functions", () => {
  it("mix2Color", () => {
    expect(mix2Color(["rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)"], "rgb")).toBe(
      "rgba(85, 85, 85, 0.75)"
    );
    expect(mix2Color(["rgba(0,0,0,0.5)", "rgba(255,255,255,0.5)"], "hex")).toBe(
      "#555555bf"
    );
  });

  it("color2Color", () => {
    expect(color2Color("rgba(0,0,0,0.5)")).toBe("#00000080");
    expect(color2Color("rgba(255,255,255,0.5)")).toBe("#ffffff80");
    expect(color2Color("#fff")).toBe("rgb(255, 255, 255)");
    expect(color2Color("#1")).toBe("");
    expect(color2Color("white", "hex")).toBe("#ffffffff");
    expect(color2Color("white", "rgb")).toBe("rgb(255, 255, 255)");
  });
});
