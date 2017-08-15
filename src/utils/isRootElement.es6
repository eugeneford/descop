import { isElement } from "./documentNodes";

/**
 * Check if target {element} is a document's root element
 * @param element — element to test
 * @throws TypeError — if {element} is not an ELEMENT_NODE
 * @returns {boolean}
 */
function isRootElement(element) {
  if (!isElement(element)) throw new TypeError("Element is not an ELEMENT_NODE");
  return element.ownerDocument.documentElement === element;
}

export default isRootElement;
