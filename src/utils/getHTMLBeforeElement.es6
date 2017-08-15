import { isElement } from "./documentNodes";
import isRootElement from "./isRootElement";

/**
 * Creates the document.documentElement.outerHTML substring up to target element
 * @param element — element to get index of
 * @returns {string|null} — the index element was found at
 */
function getHTMLBeforeElement(element) {
  if (!isElement(element)) throw new TypeError("Element is not an ELEMENT_NODE");
  if (isRootElement(element)) return null;

  const serializer = new XMLSerializer();
  let elem = element, html = "";

  while (elem) {
    // Try to add a previous sibling html
    if (elem.previousSibling) {
      elem = elem.previousSibling;
      switch (elem.nodeType) {
        case Node.types.ELEMENT_NODE:
          html = elem.outerHTML + html;
          break;
        case Node.types.TEXT_NODE:
          html = elem.data + html;
          break;
        default: // Comments and other stuff
          html = serializer.serializeToString(elem) + html;
          break;
      }
    }
    // Or try to add parentElement's opening tag
    else if (elem = elem.parentElement) {
      html = elem.outerHTML.substring(0, elem.outerHTML.indexOf(elem.innerHTML)) + html;
    }
  }

  return html;
}

export default getHTMLBeforeElement;
