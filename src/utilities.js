const getSVGElement = (idName) => {
  let svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let useElem = document.createElementNS("http://www.w3.org/2000/svg", "use");
  useElem.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `#${idName}`
  );
  svgElem.appendChild(useElem);
  return svgElem;
};

export { getSVGElement };
