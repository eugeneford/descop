import Streader from "streader";
import harmonizeHTML from "./utils/harmonizeHTML";
import getHTMLBeforeElement from "./utils/getHTMLBeforeElement";

class Descop {
  constructor() {
    this._htmlReader = new Streader('');
    this._html = null;
    this._dom = null;
  }

  connectSource(html) {

  }

  connectDocument(dom) {

  }

  /**
   * Returns the position (start and end offset) of the first occurrence of specified html
   * fragment inside connected html source
   * @param fragment — html string to search for
   * @param fromIndex — index to start search from
   */
  findFragmentPosition(fragment, fromIndex) {

  }

  /**
   * Returns the first occurrence of specified html fragment inside connected html source
   * @param fragment — html string to search for
   * @param fromIndex — index to start search from
   * @returns {string|null}
   */
  findFragment(fragment, fromIndex) {
    const position = this.findFragmentPosition(fragment, fromIndex);
    return position ? this._html.substring(position.start, position.end) : null;
  }

  /**
   * Returns the position (start and end offset) of target element in source html code
   * @param element — element to search for
   * @return {string|null}
   */
  findElementPosition(element) {

  }

  /**
   * Returns the source html code of target element
   * @param element — element to search for
   * @return {string|null}
   */
  findElement(element) {

  }
}

export default Descop;
