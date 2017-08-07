const ELEMENT_NODE = 1;

function getOuterHTMLPosition(element){
  if (element.nodeType !== ELEMENT_NODE) throw new TypeError("The type of element should be an ELEMENT_NODE (1)");

}

export default getOuterHTMLPosition;