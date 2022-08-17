import { removeRgbaBlank } from "../src/helper";

describe("helper", () => {
  it("helper", () => {
    expect(removeRgbaBlank('rgba(0, 0, 0, 1)')).toBe('rgba(0,0,0,1)');
  });
});
