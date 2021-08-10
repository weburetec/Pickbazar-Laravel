export const getColor = (color: string) => {
  const isColor = /^#([0-9A-F]{3}){1,2}$/i.test(color);

  if (!isColor && typeof window !== "undefined") {
    const style = new Option().style;
    style.color = color;

    return color;
  }

  return color;
};
