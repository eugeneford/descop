/**
 * Harmonizes targetHTML basing on sampleHTML
 * @param targetHTML
 * @param sampleHTML
 * @return {string}
 */
function harmonizeHTML(targetHTML, sampleHTML) {
  if (typeof targetHTML !== "string") throw new TypeError("Target HTML should be a String.");
  if (typeof sampleHTML !== "string") throw new TypeError("Sample HTML should be a String.");
  let harmonizedHTML = targetHTML;
  if (!/<html\s*.*>/i.test(sampleHTML)) {
    harmonizedHTML = harmonizedHTML.replace(/<\/?html>/gi, "");
  }
  if (!/<head\s*.*>/i.test(sampleHTML)) {
    harmonizedHTML = harmonizedHTML.replace(/<\/?head>/gi, "");
  }
  if (!/<body\s*.*>/i.test(sampleHTML)) {
    harmonizedHTML = harmonizedHTML.replace(/<\/?body>/gi, "");
  }
  return harmonizedHTML;
}

export default harmonizeHTML;
