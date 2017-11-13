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

	var _Descop = __webpack_require__(1);

	var _Descop2 = _interopRequireDefault(_Descop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _Descop2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _streader = __webpack_require__(2);

	var _streader2 = _interopRequireDefault(_streader);

	var _cache = __webpack_require__(3);

	var _cache2 = _interopRequireDefault(_cache);

	var _documentNodes = __webpack_require__(4);

	var _harmonizeHTML = __webpack_require__(5);

	var _harmonizeHTML2 = _interopRequireDefault(_harmonizeHTML);

	var _entitifier = __webpack_require__(6);

	var _getHTMLBeforeElement = __webpack_require__(7);

	var _getHTMLBeforeElement2 = _interopRequireDefault(_getHTMLBeforeElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var whitespace_reg = /(\r?\n|\s|\t)+/;

	/**
	 * A standardized way to find
	 * a source code position of document element
	 */

	var Descop = function () {
	  function Descop() {
	    _classCallCheck(this, Descop);

	    this._sourceReader = new _streader2.default('');
	    this._fragmentReader = new _streader2.default('');
	    this._cache = new _cache2.default();
	    this._html = null;
	    this._dom = null;
	  }

	  /**
	   * Gets current html source
	   * @return {string|null}
	   */


	  _createClass(Descop, [{
	    key: "getSource",
	    value: function getSource() {
	      return this._html;
	    }

	    /**
	     * Gets current document
	     * @return {Document|null}
	     */

	  }, {
	    key: "getDocument",
	    value: function getDocument() {
	      return this._dom;
	    }

	    /**
	     * Connects an html source to Descop instance
	     * @param html - target html source code
	     * @throws TypeError - if {html} is not a String
	     */

	  }, {
	    key: "connectSource",
	    value: function connectSource(html) {
	      if (typeof html !== "string") throw new TypeError("HTML must be a String");
	      this._html = html;
	      this._sourceReader.setSource(html);
	    }

	    /**
	     * Connects a document to Descop instance
	     * @param dom - target document
	     * @throws TypeError - if {dom} is not a DOCUMENT_NODE
	     */

	  }, {
	    key: "connectDocument",
	    value: function connectDocument(dom) {
	      if (!(0, _documentNodes.isDocument)(dom)) throw new TypeError("Dom must be a DOCUMENT_NODE");
	      this._dom = dom;
	    }

	    /**
	     * Returns the position (start and end offset) of the first occurrence of specified html
	     * fragment inside connected html source
	     * @param fragment - html string to search for
	     * @param fromIndex - index to start search from
	     */

	  }, {
	    key: "findFragmentPosition",
	    value: function findFragmentPosition(fragment) {
	      var fromIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      if (!this._html) throw new Error("Source is not connected");
	      if (typeof fragment !== "string") throw new TypeError("Fragment should be a String.");
	      var fragmentReader = this._fragmentReader;
	      var sourceReader = this._sourceReader;

	      // Harmonize fragment with source html
	      var _fragment = (0, _harmonizeHTML2.default)(fragment, this._html);

	      // Reset fragment reader with new html
	      fragmentReader.setSource(_fragment);

	      // Set start position for html reader
	      sourceReader.reset();
	      sourceReader.skip(fromIndex);

	      var entities = void 0,
	          fragmentChar = void 0,
	          sourceChar = void 0,
	          appropriateEntity = void 0,
	          start = -1,
	          end = -1,
	          whitespaces = void 0;

	      while (!fragmentReader.eof() && !sourceReader.eof()) {
	        fragmentChar = fragmentReader.read();
	        entities = (0, _entitifier.getEntities)(fragmentChar);
	        sourceChar = sourceReader.peek();

	        // Try to find appropriate entity
	        appropriateEntity = this.peekAppropriateEntity(entities);

	        // Try to skip the extra whitespaces inside the source whenever they exist
	        if (!appropriateEntity && whitespace_reg.test(sourceChar)) {
	          whitespaces = sourceReader.peekPattern(whitespace_reg, 1);
	          appropriateEntity = this.peekAppropriateEntity(entities, whitespaces.length + 1);
	          if (appropriateEntity) sourceReader.skip(whitespaces.length);
	        }

	        // Try to skip the extra whitespaces inside the fragment whenever they exist
	        if (!appropriateEntity && whitespace_reg.test(fragmentChar)) {
	          whitespaces = fragmentReader.peekPattern(whitespace_reg, 0);

	          // Stop the search if only trailing whitespaces have left inside the fragment
	          if (fragmentReader.getSource().length < fragmentReader.getIndex() + whitespaces.length) {
	            end = sourceReader.getIndex();
	            break;
	          }

	          fragmentChar = fragmentReader.peek(1, whitespaces.length);
	          entities = (0, _entitifier.getEntities)(fragmentChar);
	          appropriateEntity = this.peekAppropriateEntity(entities);
	          if (appropriateEntity) fragmentReader.skip(whitespaces.length);
	        }

	        // Reset fragment reader if entity was not found
	        if (!appropriateEntity) {
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
	      if (start > -1 && end > -1) return { start: start, end: end };
	      // Otherwise, return null
	      return null;
	    }

	    /**
	     * Returns the first occurrence of specified html fragment inside connected html source
	     * @param fragment - html string to search for
	     * @param fromIndex - index to start search from
	     * @returns {string|null}
	     */

	  }, {
	    key: "findFragment",
	    value: function findFragment(fragment, fromIndex) {
	      var position = this.findFragmentPosition(fragment, fromIndex);
	      return position ? this._html.substring(position.start, position.end) : null;
	    }

	    /**
	     * Returns the position (start and end offset) of target element in source html code
	     * @param element - element to search for
	     * @return {string|null}
	     */

	  }, {
	    key: "findElementPosition",
	    value: function findElementPosition(element) {
	      if (!this._dom) throw new Error("Document is not connected");
	      if (!(0, _documentNodes.isElement)(element)) throw new TypeError("Element must be an ELEMENT_NODE");
	      if (this._dom !== element.ownerDocument || !element.parentElement) throw new Error("Element must be a child of connected Document");
	      var preffixHTML = (0, _getHTMLBeforeElement2.default)(element);
	      var preffixPosition = this.findFragmentPosition(preffixHTML);
	      // Throw an error if preffix position was not found
	      if (!preffixPosition) throw new Error("Data corrupt. Element can not be found");
	      return this.findFragmentPosition(element.outerHTML, preffixPosition.end);
	    }

	    /**
	     * Returns the source html code of target element
	     * @param element - element to search for
	     * @return {string|null}
	     */

	  }, {
	    key: "findElement",
	    value: function findElement(element) {
	      var position = this.findElementPosition(element);
	      return this._html.substring(position.start, position.end);
	    }

	    /**
	     * Picks the most suitable representation of next source character
	     * from the provided list of html entities
	     * @param entities - list of html entities to match.
	     * @param fromIndex - index to start search from. Next character by default.
	     */

	  }, {
	    key: "peekAppropriateEntity",
	    value: function peekAppropriateEntity(entities) {
	      var fromIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      var fragmentReader = this._fragmentReader;
	      var sourceReader = this._sourceReader;

	      return entities.find(function (entity) {
	        // Skip entity if it doesn't fit
	        if (entity !== sourceReader.peek(entity.length, fromIndex)) {
	          return false;
	        }

	        // Skip multi-character entity if it represents the upcoming fragment characters
	        if (entity.length > 1) {
	          var fragmentSequence = fragmentReader.peek(entity.length, fromIndex - 1);
	          var sourceSequence = sourceReader.peek(entity.length, fromIndex);
	          return fragmentSequence !== sourceSequence;
	        }

	        return true;
	      });
	    }
	  }]);

	  return Descop;
	}();

	exports.default = Descop;

/***/ }),
/* 2 */
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

		      var sourceTrail = this._source.substring(this._index + offset - 1);

		      // Try to read a string pattern
		      if (typeof pattern === "string") {
		        for (var i = 0; i < pattern.length; i++) {
		          if (pattern[i] !== sourceTrail[i]) return null;
		        }
		        return this.peek(pattern.length, offset);
		      }
		      // Or, read a RegExp pattern
		      else if (pattern instanceof RegExp) {
		          if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
		          return RegExp.lastMatch;
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
		     * Resets current cursor position
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
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A proper way to store some data
	 */
	var Cache = function () {
	  function Cache() {
	    _classCallCheck(this, Cache);

	    this._cache = [];
	  }

	  /**
	   * Puts some data to cache with specified key
	   * @param key
	   * @param data
	   * @throws Error - if data if passed key is already exists
	   */


	  _createClass(Cache, [{
	    key: "put",
	    value: function put(key, data) {
	      if (this.exists(key)) throw new Error("A record with target key is already exists");
	      this._cache.push({ key: key, data: data });
	    }

	    /**
	     * Gets a data from a cache record with specified key
	     * @param key
	     * @return {*}
	     */

	  }, {
	    key: "get",
	    value: function get(key) {
	      var record = this._cache.find(function (record) {
	        return record.key === key;
	      });
	      return record ? record.data : null;
	    }

	    /**
	     * Refreshes a cache record with specified data
	     * @param key
	     * @param data
	     */

	  }, {
	    key: "update",
	    value: function update(key, data) {
	      var index = this.indexOf(key);
	      if (index === -1) throw new Error("A record with target key is not exists");
	      this._cache[index].data = data;
	    }

	    /**
	     * Checks if a cache record with target key is exists
	     * @param key
	     * @return {boolean}
	     */

	  }, {
	    key: "exists",
	    value: function exists(key) {
	      return this._indexOf(key) > -1;
	    }

	    /**
	     * Gets the index of target cache record
	     * @param key
	     * @return {number}
	     * @private
	     */

	  }, {
	    key: "_indexOf",
	    value: function _indexOf(key) {
	      return this._cache.findIndex(function (record) {
	        return record.key === key;
	      });
	    }
	  }]);

	  return Cache;
	}();

	exports.default = Cache;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isElement = isElement;
	exports.isText = isText;
	exports.isComment = isComment;
	exports.isDocument = isDocument;
	exports.isDocumentType = isDocumentType;
	exports.isDocumentFragment = isDocumentFragment;
	var types = exports.types = {
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
	function isElement(node) {
	  return node.nodeType === types.ELEMENT_NODE;
	}

	/**
	 * Check if {node} is an TEXT_NODE
	 * @param node - node to test
	 * @returns {boolean}
	 */
	function isText(node) {
	  return node.nodeType === types.TEXT_NODE;
	}

	/**
	 * Check if {node} is an COMMENT_NODE
	 * @param node - node to test
	 * @returns {boolean}
	 */
	function isComment(node) {
	  return node.nodeType === types.COMMENT_NODE;
	}

	/**
	 * Check if {node} is an DOCUMENT_NODE
	 * @param node - node to test
	 * @returns {boolean}
	 */
	function isDocument(node) {
	  return node.nodeType === types.DOCUMENT_NODE;
	}

	/**
	 * Check if {node} is an DOCUMENT_TYPE_NODE
	 * @param node - node to test
	 * @returns {boolean}
	 */
	function isDocumentType(node) {
	  return node.nodeType === types.DOCUMENT_TYPE_NODE;
	}

	/**
	 * Check if {node} is an DOCUMENT_FRAGMENT_NODE
	 * @param node - node to test
	 * @returns {boolean}
	 */
	function isDocumentFragment(node) {
	  return node.nodeType === types.DOCUMENT_FRAGMENT_NODE;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Harmonizes targetHTML basing on sampleHTML
	 * @param targetHTML
	 * @param sampleHTML
	 * @return {string}
	 */
	function harmonizeHTML(targetHTML, sampleHTML) {
	  if (typeof targetHTML !== "string") throw new TypeError("Target HTML should be a String.");
	  if (typeof sampleHTML !== "string") throw new TypeError("Sample HTML should be a String.");
	  var harmonizedHTML = targetHTML;
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

	exports.default = harmonizeHTML;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getEntityCode = getEntityCode;
	exports.generateEntities = generateEntities;
	exports.getEntities = getEntities;

	var _cache = __webpack_require__(3);

	var _cache2 = _interopRequireDefault(_cache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cache = new _cache2.default();
	var HTML_ENTITIES = {
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

	/**
	 * Get html entity code from specified char
	 * @param char - char to get html entity code for
	 * @returns {string} - html entity number
	 */
	function getEntityCode(char) {
	  return "&#" + char.charCodeAt(0) + ";";
	}

	function generateEntities(char) {
	  if (typeof name !== "string") throw new TypeError("Type of target name should be a String");
	  var entities = [],
	      charCode = char.charCodeAt(0),
	      lowerCase = void 0,
	      upperCase = void 0;

	  // Add character html entities if exists
	  if (HTML_ENTITIES.hasOwnProperty(charCode)) {
	    entities = entities.concat(HTML_ENTITIES[charCode]);
	  }

	  // Add character html number entity
	  entities.push(getEntityCode(char));

	  // Add lower case character variation
	  lowerCase = char.toLowerCase();
	  entities.push(lowerCase);

	  // Add upper case character variation if exists
	  upperCase = char.toUpperCase();
	  if (lowerCase !== upperCase) entities.push(upperCase);

	  return entities;
	}

	/**
	 * Gets the html entities representation of specified char
	 * @param char — char to get html entities for
	 * @throws TypeError - if {char} is not a Number
	 * @returns {Array|Null} — list of html entities
	 */
	function getEntities(char) {
	  if (typeof char !== "string") throw new TypeError("Type of target name should be a String");
	  var key = char.toLowerCase();

	  // Try to return an early cached entities
	  if (cache.exists(key)) return cache.get(key);
	  // Otherwise, generate new entities
	  var entities = generateEntities(char);
	  // Store generated entities in cache
	  cache.put(key, entities);

	  return entities;
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _documentNodes = __webpack_require__(4);

	var _isRootElement = __webpack_require__(8);

	var _isRootElement2 = _interopRequireDefault(_isRootElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates the document.documentElement.outerHTML substring up to target element
	 * @param element — element to get index of
	 * @returns {string|null} — the index element was found at
	 */
	function getHTMLBeforeElement(element) {
	  if (!(0, _documentNodes.isElement)(element)) throw new TypeError("Element is not an ELEMENT_NODE");
	  if ((0, _isRootElement2.default)(element)) return null;

	  var serializer = new XMLSerializer();
	  var elem = element,
	      html = "";

	  while (elem) {
	    // Try to add a previous sibling html
	    if (elem.previousSibling) {
	      elem = elem.previousSibling;
	      switch (elem.nodeType) {
	        case _documentNodes.types.ELEMENT_NODE:
	          html = elem.outerHTML + html;
	          break;
	        case _documentNodes.types.TEXT_NODE:
	          html = elem.data + html;
	          break;
	        default:
	          // Comments and other stuff
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

	exports.default = getHTMLBeforeElement;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _documentNodes = __webpack_require__(4);

	/**
	 * Check if target {element} is a document's root element
	 * @param element — element to test
	 * @throws TypeError — if {element} is not an ELEMENT_NODE
	 * @returns {boolean}
	 */
	function isRootElement(element) {
	  if (!(0, _documentNodes.isElement)(element)) throw new TypeError("Element is not an ELEMENT_NODE");
	  return element.ownerDocument.documentElement === element;
	}

	exports.default = isRootElement;

/***/ })
/******/ ])
});
;