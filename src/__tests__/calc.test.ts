import { mix2ModelColors, calcComplementaryColor } from "../utils/calc";

it("mix2ModelColors", () => {
  expect(
    mix2ModelColors([
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 255, g: 255, b: 255, a: 1 },
    ])
  ).toEqual({ r: 127.5, g: 127.5, b: 127.5, a: 1 });

  expect(
    mix2ModelColors(
      [
        { r: 0, g: 0, b: 0, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 },
      ],
      [0.5, 0.5]
    )
  ).toEqual({ r: 127.5, g: 127.5, b: 127.5, a: 1 });

  expect(
    mix2ModelColors(
      [
        { r: 0, g: 0, b: 0, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 },
      ],
      [0.5, 0.6]
    )
  ).toEqual({ r: 0, g: 0, b: 0, a: 0 });
});

it("calcComplementaryColor", () => {
  expect(calcComplementaryColor({ r: 0, g: 0, b: 0, a: 1 })).toEqual({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
});
