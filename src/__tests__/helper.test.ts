import { removeColorStrBlank, getColorType, isLight } from "../utils/helper";

describe("helper", () => {
  it("removeColorStrBlank", () => {
    expect(removeColorStrBlank("rgba(0, 0, 0, 1)")).toBe("rgba(0,0,0,1)");
  });

  it("getColorType", () => {
    expect(getColorType("rgba(255,255,255,1)")).toBe("rgba");
    expect(getColorType("rgba(0,0,0,0)")).toBe("rgba");
    expect(getColorType("rgb(255,255,255)")).toBe("rgb");
    expect(getColorType("rgb(0,0,0)")).toBe("rgb");
    expect(getColorType("#ffffffff")).toBe("hex");
    expect(getColorType("#ffffff")).toBe("hex");
    expect(getColorType("#fff")).toBe("hex");
  });

  it("isLight", () => {
    expect(isLight("rgba(255,255,255,1)")).toBe(true);
    expect(isLight("rgba(0,0,0,0)")).toBe(false);
  });
});
