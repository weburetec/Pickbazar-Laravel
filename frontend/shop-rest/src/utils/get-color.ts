export const getColor = (color: string) => {
  const isColor = /^#([0-9A-F]{3}){1,2}$/i.test(color);
  const style = new Option().style;
  style.color = color;

  return isColor ? color : style.color !== "" ? color : undefined;
};
