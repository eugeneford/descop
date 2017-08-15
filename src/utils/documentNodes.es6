export const types = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11
};

/**
 * Check if {node} is an ELEMENT_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isElement(node){
  return node.nodeType === types.ELEMENT_NODE;
}

/**
 * Check if {node} is an TEXT_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isText(node){
  return node.nodeType === types.TEXT_NODE;
}

/**
 * Check if {node} is an COMMENT_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isComment(node){
  return node.nodeType === types.COMMENT_NODE;
}

/**
 * Check if {node} is an DOCUMENT_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isDocument(node){
  return node.nodeType === types.DOCUMENT_NODE;
}

/**
 * Check if {node} is an DOCUMENT_TYPE_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isDocumentType(node){
  return node.nodeType === types.DOCUMENT_TYPE_NODE;
}

/**
 * Check if {node} is an DOCUMENT_FRAGMENT_NODE
 * @param node - node to test
 * @returns {boolean}
 */
export function isDocumentFragment(node){
  return node.nodeType === types.DOCUMENT_FRAGMENT_NODE;
}
