import Streader from "streader";
import Cache from "./utils/cache";
import {isElement, isDocument} from "./utils/documentNodes";
import harmonizeHTML from "./utils/harmonizeHTML";
import {getEntities} from "./utils/entitifier";
import getHTMLBeforeElement from "./utils/getHTMLBeforeElement";

/**
 * A standardized way to find
 * a source code position of document element
 */
class Descop {
  constructor() {
    this._sourceReader = new Streader('');
    this._fragmentReader = new Streader('');
    this._cache = new Cache();
    this._html = null;
    this._dom = null;
  }

  /**
   * Connects an html source to Descop instance
   * @param html - target html source code
   * @throws TypeError - if {html} is not a String
   */
  connectSource(html) {
    if (typeof html !== "string") throw new TypeError("HTML must be a String");
    this._html = html;
    this._sourceReader.setSource(html);
  }

  /**
   * Connects a document to Descop instance
   * @param dom - target document
   * @throws TypeError - if {dom} is not a DOCUMENT_NODE
   */
  connectDocument(dom) {
    if (!isDocument(dom)) throw new TypeError("Dom must be a DOCUMENT_NODE");
    this._dom = dom;
  }

  /**
   * Returns the position (start and end offset) of the first occurrence of specified html
   * fragment inside connected html source
   * @param fragment - html string to search for
   * @param fromIndex - index to start search from
   */
  findFragmentPosition(fragment, fromIndex = 0) {
    if (!this._html) throw new Error("Source is not connected");
    if (typeof fragment !== "string") throw new TypeError("Fragment should be a String.");
    const fragmentReader = this._fragmentReader;
    const sourceReader = this._sourceReader;

    // Harmonize fragment with source html
    let _fragment = harmonizeHTML(fragment, this._html);

    // Reset fragment reader with new html
    fragmentReader.setSource(_fragment);

    // Set start position for html reader
    sourceReader.reset();
    sourceReader.skip(fromIndex);

    let entities, fragmentChar, sourceChar, appropriateEntity, start = -1, end = -1;

    while (!fragmentReader.eof() && !sourceReader.eof()) {
      fragmentChar = fragmentReader.read();
      entities = getEntities(fragmentChar);
      sourceChar = sourceReader.peek();

      // Skip unnecessary whitespaces inside source html
      if (fragmentChar !== sourceChar && !/\r?\n|\s|\t/.test(fragmentChar) && /\r?\n|\s|\t/.test(sourceChar)){
        sourceReader.skipPattern(/(\r?\n|\s|\t)+/);
      }

      // Try to find appropriate entity
      appropriateEntity = entities.find(entity => entity === sourceReader.peek(entity.length));

      // Reset fragment reader if entity was not found
      if (!appropriateEntity){
        fragmentReader.reset();
        start = -1;
        sourceReader.skip();
      }
      // Otherwise, continue matching
      else {
        if (start === -1) start = sourceReader.getIndex();
        sourceReader.skip(appropriateEntity.length);
        if (fragmentReader.eof()) end = sourceReader.getIndex();
      }
    }

    // Return position if start and end was found
    if (start > -1 && end > -1) return { start, end };
    // Otherwise, return null
    return null;
  }

  /**
   * Returns the first occurrence of specified html fragment inside connected html source
   * @param fragment - html string to search for
   * @param fromIndex - index to start search from
   * @returns {string|null}
   */
  findFragment(fragment, fromIndex) {
    const position = this.findFragmentPosition(fragment, fromIndex);
    return position ? this._html.substring(position.start, position.end) : null;
  }

  /**
   * Returns the position (start and end offset) of target element in source html code
   * @param element - element to search for
   * @return {string|null}
   */
  findElementPosition(element) {
    if (!this._dom) throw new Error("Document is not connected");
    if (!isElement(element)) throw new TypeError("Element must be an ELEMENT_NODE");
    if (this._dom !== element.ownerDocument) throw new Error("Element must be a child of connected Document");
    let preffixHTML = getHTMLBeforeElement(element);
    let preffixPosition = this.findFragmentPosition(preffixHTML);
    // Throw an error if preffix position was not found
    if (!preffixPosition) throw new Error("Data corrupt. Element can not be found");
    return this.findFragmentPosition(element.outerHTML, preffixPosition.end);
  }

  /**
   * Returns the source html code of target element
   * @param element - element to search for
   * @return {string|null}
   */
  findElement(element) {
    const position = this.findElementPosition(element);
    return position ? this._html.substring(position.start, position.end) : null;
  }
}

export default Descop;
