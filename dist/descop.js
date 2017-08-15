(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Descop"] = factory();
	else
		root["Descop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _DocumentUtils = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./DocumentUtils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var DocumentUtils = _interopRequireWildcard(_DocumentUtils);

	var _DocumentNode = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils/DocumentNode\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var DocumentNode = _interopRequireWildcard(_DocumentNode);

	var _HTMLUtils = __webpack_require__(3);

	var HTMLUtils = _interopRequireWildcard(_HTMLUtils);

	var _HTMLEntitifier = __webpack_require__(6);

	var _HTMLEntitifier2 = _interopRequireDefault(_HTMLEntitifier);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	module.exports = {
	  DocumentNode: DocumentNode, DocumentUtils: DocumentUtils, HTMLUtils: HTMLUtils, HTMLEntitifier: _HTMLEntitifier2.default
	};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.findFragmentPosition = findFragmentPosition;
	exports.test = test;
	exports.findFragment = findFragment;

	var _streader = __webpack_require__(5);

	var _streader2 = _interopRequireDefault(_streader);

	var _HTMLEntitifier = __webpack_require__(6);

	var _HTMLEntitifier2 = _interopRequireDefault(_HTMLEntitifier);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var entitifier = new _HTMLEntitifier2.default();
	var hReader = new _streader2.default("");

	/**
	 *
	 * @param fragment
	 * @param html
	 * @returns {{start: number, end: number}|null}
	 */
	function findFragmentPosition(fragment, html) {
	  if (typeof fragment !== "string") throw new TypeError("Fragment should be a String.");
	  if (typeof html !== "string") throw new TypeError("Fragment should be a String.");
	  // const entitifier = new HTMLEntitifier();
	  // const hReader = new StringReader(html);
	  hReader.setSource(html);
	  var fEntities = entitifier.entitify(harmonizeHTML(fragment, html));
	  var hChar = void 0,
	      fChar = void 0,
	      founded = void 0,
	      start = void 0,
	      end = void 0,
	      i = void 0,
	      j = void 0,
	      variations = void 0,
	      entity = void 0;

	  i = 0;
	  while (i < fEntities.length && !hReader.eof()) {
	    founded = false;
	    entity = fEntities[i];
	    variations = entity.variations;
	    fChar = entity.origin;
	    hChar = hReader.peek();

	    if (fChar !== hChar && !/\r?\n|\s|\t/.test(fChar) && /\r?\n|\s|\t/.test(hChar)) {
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

	  if (typeof start === "undefined" || typeof end === "undefined") return null;

	  return { start: start, end: end };
	}

	function test(fragment, html) {
	  var hReader = new StringReader(html);
	  var fReader = new StringReader(fragment);
	  var fChar = void 0,
	      hChar = void 0;

	  while (!fReader.eof() && !hReader.eof()) {
	    fChar = fReader.peek();
	    hChar = hReader.peek();

	    fReader.skip();
	  }
	}

	/**
	 * Returns the first occurrence of specified html fragment in target html string
	 * @param fragment — html string to search for
	 * @param html — html string to search in
	 * @returns {string|null}
	 */
	function findFragment(fragment, html) {
	  var position = findFragmentPosition(fragment, html);
	  return position ? html.substring(position.start, position.end) : null;
	}

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Streader"] = factory();
		else
			root["Streader"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

		"use strict";

		var _StringReader = __webpack_require__(1);

		var _StringReader2 = _interopRequireDefault(_StringReader);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		module.exports = _StringReader2.default;

	/***/ }),
	/* 1 */
	/***/ (function(module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		/**
		 * Convenient way to read through strings
		 * @class StringReader
		 */
		var StringReader = function () {
		  /**
		   * Creates a new instance of StringReader
		   * @constructor
		   * @param text
		   */
		  function StringReader(text) {
		    _classCallCheck(this, StringReader);

		    if (text && typeof text !== "string") throw new TypeError("Text should be a String");
		    this._source = text;
		    this._index = 0;
		  }

		  /**
		   * Loads the new text source to StringReader.
		   * Note: method resets current cursor data.
		   * @param text
		   */


		  _createClass(StringReader, [{
		    key: "setSource",
		    value: function setSource(text) {
		      if (typeof text === "undefined") throw new Error("Text is missing");
		      if (typeof text !== "string") throw new TypeError("Text should be a String");
		      this._source = text;
		      this.reset();
		    }

		    /**
		     * Gets the current index of the cursor.
		     * @returns {number}
		     */

		  }, {
		    key: "getIndex",
		    value: function getIndex() {
		      return this._index;
		    }

		    /**
		     * Gets the current reader's source string
		     * @return {*}
		     */

		  }, {
		    key: "getSource",
		    value: function getSource() {
		      return this._source;
		    }

		    /**
		     * Reads the next character without advancing the cursor
		     * @param offset — optional offset to start read at
		     * @param count — optional count of characters to read
		     * @returns {string|null}
		     */

		  }, {
		    key: "peek",
		    value: function peek() {
		      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		      // If we're at the end of the source
		      if (offset > 0 && this.eof()) return null;

		      var peekIndex = this._index + offset - 1;

		      // Return null if peekIndex is larger than source length
		      if (peekIndex >= this._source.length) return null;
		      // Or try to return a single character
		      if (count <= 1) return this._source.charAt(peekIndex);
		      // Otherwise return sequence
		      return this._source.substr(peekIndex, count);
		    }

		    /**
		     * Reads characters that match either string or regexp pattern without advancing the cursor.
		     * @param offset — optional offset to start read at
		     * @param pattern — string of regexp to get matched
		     * @throws TypeError — if {pattern} is not a string or regexp
		     * @return {string|null}
		     */

		  }, {
		    key: "peekPattern",
		    value: function peekPattern(pattern) {
		      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		      // If we're at the end of the source
		      if (this.eof()) return null;

		      var sourceTrail = this._source.substring(this._index);

		      // Try to read a string pattern
		      if (typeof pattern === "string") {
		        for (var i = 0; i < pattern.length; i++) {
		          if (pattern[i] !== sourceTrail[i + offset - 1]) return null;
		        }
		        return this.peek(pattern.length, offset);
		      }
		      // Or, read a RegExp pattern
		      else if (pattern instanceof RegExp) {
		          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
		          return this.peek(RegExp.lastMatch.length, offset);
		        }
		        // Otherwise, throw an Error
		        else throw new TypeError("Pattern must be a String or RegExp");
		    }

		    /**
		     * Reads the next character
		     * @param count — optional count of character to read
		     * @returns {string|null}
		     */

		  }, {
		    key: "read",
		    value: function read() {
		      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

		      // If we're at the end of the source
		      if (this.eof()) return null;
		      var str = void 0;

		      // Try to get a single character
		      if (count <= 1) str = this._source.charAt(this._index);
		      // Otherwise, get a sequence
		      else str = this._source.substr(this._index, count);

		      // Increment cursor position
		      this._index = this._index + count;

		      return str;
		    }

		    /**
		     * Reads characters that match either string or regexp pattern.
		     * @param pattern — string of regexp to get matched
		     * @throws TypeError — if {pattern} is not a string or regexp
		     * @return {string|null}
		     */

		  }, {
		    key: "readPattern",
		    value: function readPattern(pattern) {
		      // If we're at the end of the source
		      if (this.eof()) return null;

		      var sourceTrail = this._source.substring(this._index);

		      // Try to read a string pattern
		      if (typeof pattern === "string") {
		        for (var i = 0; i < pattern.length; i++) {
		          if (pattern[i] !== sourceTrail[i]) return null;
		        }
		        return this.read(pattern.length);
		      }
		      // Or, read a RegExp pattern
		      else if (pattern instanceof RegExp) {
		          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
		          return this.read(RegExp.lastMatch.length);
		        }
		        // Otherwise, throw an Error
		        else throw new TypeError("Pattern must be a String or RegExp");
		    }

		    /**
		     * Skips the next character
		     * @param count — optional count of character to skip
		     * @return {number} — count of actually skipped characters
		     */

		  }, {
		    key: "skip",
		    value: function skip() {
		      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

		      // If we're at the end of the source
		      if (this.eof()) return 0;
		      var skipped = void 0;

		      // Try to skip available count
		      if (this._index + count > this._source.length) {
		        skipped = this._source.length - this._index;
		        this._index = this._source.length;
		        return skipped;
		      }
		      // Otherwise, skip specified count
		      this._index = this._index + count;
		      return count;
		    }

		    /**
		     * Skips characters that match either string or regexp
		     * @param pattern — string or regexp to get matched
		     * @throws TypeError — if {pattern} is not a string or regexp
		     * @return {number} — count of skipped characters
		     */

		  }, {
		    key: "skipPattern",
		    value: function skipPattern(pattern) {
		      // If we're at the end of the source
		      if (this.eof()) return 0;

		      var sourceTrail = this._source.substring(this._index);

		      // Try to read a string pattern
		      if (typeof pattern === "string") {
		        for (var i = 0; i < pattern.length; i++) {
		          if (pattern[i] !== sourceTrail[i]) return 0;
		        }
		        return this.skip(pattern.length);
		      }
		      // Or, read a RegExp pattern
		      else if (pattern instanceof RegExp) {
		          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return 0;
		          return this.skip(RegExp.lastMatch.length);
		        }
		        // Otherwise, throw an Error
		        else throw new TypeError("Pattern must be a String or RegExp");
		    }

		    /**
		     * Checks if we're at the end of the source
		     * @returns {boolean}
		     */

		  }, {
		    key: "eof",
		    value: function eof() {
		      return this._index >= this._source.length;
		    }

		    /**
		     * Reset current cursor position
		     */

		  }, {
		    key: "reset",
		    value: function reset() {
		      this._index = 0;
		    }

		    /**
		     * Normalizes target RegExp to be matched with the start of the source
		     * @param regexp
		     * @return {RegExp}
		     * @private
		     */

		  }, {
		    key: "_normalizeRegExp",
		    value: function _normalizeRegExp(regexp) {
		      if (regexp.source.indexOf("^") > -1) return regexp;
		      return new RegExp("^" + regexp.source, regexp.flags);
		    }
		  }]);

		  return StringReader;
		}();

		exports.default = StringReader;

	/***/ })
	/******/ ])
	});
	;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _streader = __webpack_require__(5);

	var _streader2 = _interopRequireDefault(_streader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ENTITIES = {
	  10: ["\r\n"],
	  32: ["\t", "\n", "\r\n"],
	  34: ["&quot;", "'"],
	  35: ["&num;"],
	  36: ["&dollar;"],
	  37: ["&percnt;"],
	  38: ["&amp;"],
	  39: ["&apos;", "\""],
	  40: ["&lpar;"],
	  41: ["&rpar;"],
	  42: ["&ast;"],
	  43: ["&plus;"],
	  44: ["&comma;"],
	  45: ["&minus;"],
	  46: ["&period;"],
	  47: ["&sol;"],
	  58: ["&colon;"],
	  59: ["&semi;"],
	  60: ["&lt;"],
	  61: ["&equals;"],
	  62: ["&gt;"],
	  63: ["&quest;"],
	  64: ["&commat;"],
	  91: ["&lsqb;"],
	  92: ["&bsol;"],
	  93: ["&rsqb;"],
	  94: ["&Hat;"],
	  95: ["&lowbar;"],
	  96: ["&grave;"],
	  123: ["&lcub;"],
	  124: ["&verbar;"],
	  125: ["&rcub;"],
	  160: ["&nbsp;"],
	  161: ["&iexcl;"],
	  162: ["&cent;"],
	  163: ["&pound;"],
	  164: ["&curren;"],
	  165: ["&yen;"],
	  166: ["&brvbar;"],
	  167: ["&sect;"],
	  168: ["&uml;"],
	  169: ["&copy;"],
	  170: ["&ordf;"],
	  171: ["&laquo;"],
	  172: ["&not;"],
	  173: ["&shy;"],
	  174: ["&reg;"],
	  175: ["&macr;"],
	  176: ["&deg;"],
	  177: ["&plusmn;"],
	  178: ["&sup2;"],
	  179: ["&sup3;"],
	  180: ["&acute;"],
	  181: ["&micro;"],
	  182: ["&para;"],
	  183: ["&middot;"],
	  184: ["&cedil;"],
	  185: ["&sup1;"],
	  186: ["&ordm;"],
	  187: ["&raquo;"],
	  188: ["&frac14;"],
	  189: ["&frac12;"],
	  190: ["&frac34;"],
	  191: ["&iquest;"],
	  192: ["&Agrave;"],
	  193: ["&Aacute;"],
	  194: ["&Acirc;"],
	  195: ["&Atilde;"],
	  196: ["&Auml;"],
	  197: ["&Aring;"],
	  198: ["&AElig;"],
	  199: ["&Ccedil;"],
	  200: ["&Egrave;"],
	  201: ["&Eacute;"],
	  202: ["&Ecirc;"],
	  203: ["&Euml;"],
	  204: ["&Igrave;"],
	  205: ["&Iacute;"],
	  206: ["&Icirc;"],
	  207: ["&Iuml;"],
	  208: ["&ETH;"],
	  209: ["&Ntilde;"],
	  210: ["&Ograve;"],
	  211: ["&Oacute;"],
	  212: ["&Ocirc;"],
	  213: ["&Otilde;"],
	  214: ["&Ouml;"],
	  215: ["&times;"],
	  216: ["&Oslash;"],
	  217: ["&Ugrave;"],
	  218: ["&Uacute;"],
	  219: ["&Ucirc;"],
	  220: ["&Uuml;"],
	  221: ["&Yacute;"],
	  222: ["&THORN;"],
	  223: ["&szlig;"],
	  224: ["&agrave;"],
	  225: ["&aacute;"],
	  226: ["&acirc;"],
	  227: ["&atilde;"],
	  228: ["&auml;"],
	  229: ["&aring;"],
	  230: ["&aelig;"],
	  231: ["&ccedil;"],
	  232: ["&egrave;"],
	  233: ["&eacute;"],
	  234: ["&ecirc;"],
	  235: ["&euml;"],
	  236: ["&igrave;"],
	  237: ["&iacute;"],
	  238: ["&icirc;"],
	  239: ["&iuml;"],
	  240: ["&eth;"],
	  241: ["&ntilde;"],
	  242: ["&ograve;"],
	  243: ["&oacute;"],
	  244: ["&ocirc;"],
	  245: ["&otilde;"],
	  246: ["&ouml;"],
	  247: ["&divide;"],
	  248: ["&oslash;"],
	  249: ["&ugrave;"],
	  250: ["&uacute;"],
	  251: ["&ucirc;"],
	  252: ["&uuml;"],
	  253: ["&yacute;"],
	  254: ["&thorn;"],
	  255: ["&yuml;"],
	  338: ["&OElig;"],
	  339: ["&oelig;"],
	  352: ["&Scaron;"],
	  353: ["&scaron;"],
	  376: ["&Yuml;"],
	  402: ["&fnof;"],
	  710: ["&circ;"],
	  732: ["&tilde;"],
	  913: ["&Alpha;"],
	  914: ["&Beta;"],
	  915: ["&Gamma;"],
	  916: ["&Delta;"],
	  917: ["&Epsilon;"],
	  918: ["&Zeta;"],
	  919: ["&Eta;"],
	  920: ["&Theta;"],
	  921: ["&Iota;"],
	  922: ["&Kappa;"],
	  923: ["&Lambda;"],
	  924: ["&Mu;"],
	  925: ["&Nu;"],
	  926: ["&Xi;"],
	  927: ["&Omicron;"],
	  928: ["&Pi;"],
	  929: ["&Rho;"],
	  931: ["&Sigma;"],
	  932: ["&Tau;"],
	  933: ["&Upsilon;"],
	  934: ["&Phi;"],
	  935: ["&Chi;"],
	  936: ["&Psi;"],
	  937: ["&Omega;"],
	  945: ["&alpha;"],
	  946: ["&beta;"],
	  947: ["&gamma;"],
	  948: ["&delta;"],
	  949: ["&epsilon;"],
	  950: ["&zeta;"],
	  951: ["&eta;"],
	  952: ["&theta;"],
	  953: ["&iota;"],
	  954: ["&kappa;"],
	  955: ["&lambda;"],
	  956: ["&mu;"],
	  957: ["&nu;"],
	  958: ["&xi;"],
	  959: ["&omicron;"],
	  960: ["&pi;"],
	  961: ["&rho;"],
	  962: ["&sigmaf;"],
	  963: ["&sigma;"],
	  964: ["&tau;"],
	  965: ["&upsilon;"],
	  966: ["&phi;"],
	  967: ["&chi;"],
	  968: ["&psi;"],
	  969: ["&omega;"],
	  977: ["&thetasym;"],
	  978: ["&upsih;"],
	  982: ["&piv;"],
	  8194: ["&ensp;"],
	  8195: ["&emsp;"],
	  8201: ["&thinsp;"],
	  8204: ["&zwnj;"],
	  8205: ["&zwj;"],
	  8206: ["&lrm;"],
	  8207: ["&rlm;"],
	  8211: ["&ndash;"],
	  8212: ["&mdash;"],
	  8216: ["&lsquo;"],
	  8217: ["&rsquo;"],
	  8218: ["&sbquo;"],
	  8220: ["&ldquo;"],
	  8221: ["&rdquo;"],
	  8222: ["&bdquo;"],
	  8224: ["&dagger;"],
	  8225: ["&Dagger;"],
	  8240: ["&permil;"],
	  8249: ["&lsaquo;"],
	  8250: ["&rsaquo;"],
	  8226: ["&bull;"],
	  8230: ["&hellip;"],
	  8242: ["&prime;"],
	  8243: ["&Prime;"],
	  8254: ["&oline;"],
	  8260: ["&frasl;"],
	  8472: ["&weierp;"],
	  8465: ["&image;"],
	  8476: ["&real;"],
	  8482: ["&trade;"],
	  8501: ["&alefsym;"],
	  8592: ["&larr;"],
	  8593: ["&uarr;"],
	  8594: ["&rarr;"],
	  8595: ["&darr;"],
	  8596: ["&harr;"],
	  8629: ["&crarr;"],
	  8656: ["&lArr;"],
	  8657: ["&uArr;"],
	  8658: ["&rArr;"],
	  8659: ["&dArr;"],
	  8660: ["&hArr;"],
	  8704: ["&forall;"],
	  8706: ["&part;"],
	  8707: ["&exist;"],
	  8709: ["&empty;"],
	  8711: ["&nabla;"],
	  8712: ["&isin;"],
	  8713: ["&notin;"],
	  8715: ["&ni;"],
	  8719: ["&prod;"],
	  8721: ["&sum;"],
	  8722: ["&minus;"],
	  8727: ["&lowast;"],
	  8730: ["&radic;"],
	  8733: ["&prop;"],
	  8734: ["&infin;"],
	  8736: ["&ang;"],
	  8870: ["&or;"],
	  8745: ["&cap;"],
	  8746: ["&cup;"],
	  8747: ["&int;"],
	  8756: ["&there4;"],
	  8764: ["&sim;"],
	  8773: ["&cong;"],
	  8776: ["&asymp;"],
	  8800: ["&ne;"],
	  8801: ["&equiv;"],
	  8804: ["&le;"],
	  8805: ["&ge;"],
	  8834: ["&sub;"],
	  8835: ["&sup;"],
	  8836: ["&nsub;"],
	  8838: ["&sube;"],
	  8839: ["&supe;"],
	  8853: ["&oplus;"],
	  8855: ["&otimes;"],
	  8869: ["&perp;", "&and;"],
	  8901: ["&sdot;"],
	  8968: ["&lceil;"],
	  8969: ["&rceil;"],
	  8970: ["&lfloor;"],
	  8971: ["&rfloor;"],
	  9001: ["&lang;"],
	  9002: ["&rang;"],
	  9674: ["&loz;"],
	  9824: ["&spades;"],
	  9827: ["&clubs;"],
	  9829: ["&hearts;"],
	  9830: ["&diams;"]
	};

	var HTMLEntitifier = function () {
	  function HTMLEntitifier() {
	    _classCallCheck(this, HTMLEntitifier);

	    this.reader = new _streader2.default('');
	  }

	  /**
	   * Get html entity code from specified charCode
	   * @param charCode - charCode to get html entity code for
	   * @returns {string} - html entity number
	   */


	  _createClass(HTMLEntitifier, [{
	    key: "getCharEntityCode",
	    value: function getCharEntityCode(charCode) {
	      return "&#" + charCode + ";";
	    }

	    /**
	     * Get the html entities representation of specified char
	     * @param char — char to get html entities for
	     * @throws TypeError - if {char} is not a Number
	     * @returns {Array|Null} — list of html entities
	     */

	  }, {
	    key: "getCharEntities",
	    value: function getCharEntities(char) {
	      if (typeof name !== "string") throw new TypeError("Type of target name should be a String");
	      var entities = [],
	          charCode = char.charCodeAt(0),
	          lowerCase = void 0,
	          upperCase = void 0;

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
	  }, {
	    key: "entitify",
	    value: function entitify(html) {
	      var char = void 0,
	          entity = void 0,
	          entities = [];

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
	  }]);

	  return HTMLEntitifier;
	}();

	exports.default = HTMLEntitifier;

/***/ })
/******/ ])
});
;