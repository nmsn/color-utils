export const removeRgbaBlank = (color: string) => {
  return color.replace(/\s+/g, "");
};
