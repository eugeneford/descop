import Streader from "streader";

class HTMLEntitifier {
  constructor() {
    this.reader = new Streader('');
  }

  /**
   * Get html entity code from specified charCode
   * @param charCode - charCode to get html entity code for
   * @returns {string} - html entity number
   */
  getCharEntityCode(charCode) {
    return `&#${charCode};`;
  }

  /**
   * Get the html entities representation of specified char
   * @param char — char to get html entities for
   * @throws TypeError - if {char} is not a Number
   * @returns {Array|Null} — list of html entities
   */
  getCharEntities(char) {
    if (typeof name !== "string") throw new TypeError("Type of target name should be a String");
    let entities = [], charCode = char.charCodeAt(0), lowerCase, upperCase;

    // Add character html entities if exists
    if (ENTITIES.hasOwnProperty(charCode)) {
      entities = entities.concat(ENTITIES[charCode]);
    }

    // Add character html number entity
    entities.push(this.getCharEntityCode(charCode));

    // Add lower case character variation
    lowerCase = char.toLowerCase();
    entities.push(lowerCase);

    // Add upper case character variation if exists
    upperCase = char.toUpperCase();
    if (lowerCase !== upperCase) entities.push(upperCase);

    return entities;
  }

  entitify(html) {
    let char, entity, entities = [];

    this.reader.setSource(html);

    while (!this.reader.eof()) {
      char = this.reader.read();

      entity = {
        origin: char,
        variations: this.getCharEntities(char)
      };

      entities.push(entity);
    }

    return entities;
  }
}

export default HTMLEntitifier;
