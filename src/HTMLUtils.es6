import Streader from "streader";
import HTMLEntitifier from "./HTMLEntitifier";

const entitifier = new HTMLEntitifier();
const hReader = new Streader("");

/**
 *
 * @param fragment
 * @param html
 * @returns {{start: number, end: number}|null}
 */
export function findFragmentPosition(fragment, html) {
  if (typeof fragment !== "string") throw new TypeError("Fragment should be a String.");
  if (typeof html !== "string") throw new TypeError("Fragment should be a String.");
  // const entitifier = new HTMLEntitifier();
  // const hReader = new StringReader(html);
  hReader.setSource(html);
  const fEntities = entitifier.entitify(harmonizeHTML(fragment, html));
  let hChar, fChar, founded, start, end, i, j, variations, entity;

  i = 0;
  while (i < fEntities.length && !hReader.eof()) {
    founded = false;
    entity = fEntities[i];
    variations = entity.variations;
    fChar = entity.origin;
    hChar = hReader.peek();

    if (fChar !== hChar
      && !/\r?\n|\s|\t/.test(fChar)
      && /\r?\n|\s|\t/.test(hChar)){
      hReader.skipPattern(/(\r?\n|\s|\t)+/);
    }

    for (j = 0; j < variations.length; j++) {
      fChar = variations[j];
      hChar = hReader.peek(1, fChar.length);

      if (fChar === hChar) {
        if (typeof start === "undefined") start = hReader.getIndex();
        hReader.skip(fChar.length);
        if (i === fEntities.length - 1) end = hReader.getIndex();
        founded = true;
        break;
      }
    }

    if (!founded) {
      i = 0;
      start = undefined;
      hReader.skip(1);
    } else {
      i = i + 1;
    }
  }

  if (typeof start === "undefined"
    || typeof end === "undefined") return null;

  return {start, end};
}
