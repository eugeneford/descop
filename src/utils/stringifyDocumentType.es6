import { isDocument } from "./documentNodes";

/**
 * Decodes DocumentType to string
 * @param document
 * @returns {string|null}
 */
function stringifyDocumentType(document) {
  if (!isDocument(document)) throw TypeError("Document is not a DOCUMENT_NODE");
  if (!document.doctype) return null;

  return "<!DOCTYPE "
    + document.doctype.name
    + (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '')
    + (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '')
    + (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '')
    + '>'
}

export default stringifyDocumentType;
