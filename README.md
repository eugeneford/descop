<p align="center">
  <img src="https://raw.githubusercontent.com/eugeneford/descop/master/.github/descop-logo.png" width="100" height="100">
</p>

<h3 align="center">
  Descop
</h3>

<p align="center">
  A small Library allowing you to get caret [start, end] offset position of element in source HTML code
</p>

<p align="center">
  <a href="https://travis-ci.org/eugeneford/descop">
    <img src="https://travis-ci.org/eugeneford/descop.svg?branch=master" alt="Build Status">
  </a>
  <a href='https://coveralls.io/github/eugeneford/descop?branch=master'>
    <img src='https://coveralls.io/repos/github/eugeneford/descop/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://www.npmjs.com/package/descop'>
    <img src='https://img.shields.io/npm/v/descop.svg' alt='NPM Version' />
  </a>
</p>

## Basic Overview
Descop is a library which allows you to find a source code position of target document element in standardized way.

> Note: it works only with a static document without scripts or any dynamic markup.
  If you need to find an element inside a dynamic document - use a some kind a Static to Dynamic DOM mapper first.
  Or, simply wait a bit - i'm on my way to create a one for you.
> - Eugene Ford, author

Library can be used both in Node.js and directly in Browser.
It is well-documented and completely covered with test specs (excluding webpack bundling definitions and external modules).

If you want to add some features or to suggest any idea, feel free - [contributions are always welcome](#contributing-to-descop).

## How to Install
#### Using NPM
To use Descop with NPM simply call:
```js
npm install --save descop
```

#### In Browser
To use Descop directly in browser simply download this repository and copy dist/descop.js into your project.
Next, include it on your .html page:
```html
<script src="path/to/your/js/descop.js"></script>
```

## Get Started
First, there are two simple conditions to use Descop:
1) Your html source must be Valid. (use w3c validator for example)
2) Your document must be a static one.

That's all.

You are able to use Descop as the importable npm package or directly in browser.

#### In Node.js
```js
import Descop from "descop";

// Get the source html code of target document
var html = yourFunctionToGetHTML();

// Get the target document itself
var dom = yourFunctionToGetDocument();

// Get the element you want to found in source code
var element = document.getElementById("target-element");

// Create an instance of Descop
var descop = new Descop();

// Connect document
descop.connectDocument(dom);

// Connect source code
descop.connectSource(html);

// Get element position in source code
var position = descop.getElementPosition(element);
// eg. position => { start: 320, end: 480 }
```

#### In Browser
```html
<script>
// Get the source html code of target document
var html = yourFunctionToGetHTML();

// Get the target document itself
var dom = yourFunctionToGetDocument();

// Get the element you want to found in source code
var element = document.getElementById("target-element");

// Create an instance of Descop
var descop = new Descop();

// Connect document
descop.connectDocument(dom);

// Connect source code
descop.connectSource(html);

// Get element position in source code
var position = descop.getElementPosition(element);
// eg. position => { start: 320, end: 480 }
</script>
```

## API
### connectSource(html)
Connects an html source to Descop instance
```js
var descop = new Descop();
var html = "<!DOCTYPE html><title > Example </title ><div>Hello World</div>";
descop.connectSource(html);
```

### connectDocument(document)
Connects a document to Descop instance
```js
var descop = new Descop();
descop.connectDocument(document);
```

### findFragmentPosition(fragment, fromIndex)
Returns the position (start and end offset) of the first occurrence of specified html fragment
inside connected html source. Fragment - html string to search for, FromIndex - optional index to start search from
```js
var descop = new Descop();
...

var position = descop.findFragmentPosition("<title>Example</title>");
// position => { start: 15, end: 41 }
```

### findFragment(fragment, fromIndex)
Returns the first occurrence of specified html fragment inside connected html source.
Fragment - html string to search for, FromIndex - optional index to start search from.
```js
var descop = new Descop();
...

var html = descop.findFragment("<title>Example</title>");
// html => "<title > Example </title >"
```

### findElementPosition(element)
Returns the position (start and end offset) of target element in source html code.
Element - element to search for.
```js
var descop = new Descop();
...
var element = document.querySelector("div");

var position = descop.findElementPosition(element);
// position => { start: 41, end: 63 }
```

### findElement(element)
Returns the source html code of target element.
Element - element to search for.
```js
var descop = new Descop();
...
var element = document.querySelector("div");

var html = descop.findElement(element);
// html => "<div>Hello World</div>"
```

### getSource()
Gets current html source.
```js
var descop = new Descop();

...

var source = descop.getSource();
```

### getDocument()
Gets current document.
```js
var descop = new Descop();

...

var doc = descop.getDocument();
```

## Contributing to Descop
Contributions are always welcome.
Before contributing please read the [code of conduct](https://js.foundation/community/code-of-conduct) &
[search the issue tracker](https://github.com/eugeneford/descop/issues) (your issue may have already been discussed or fixed).

To contribute, follow next steps:
* Fork Descop
* Commit your changes
* Open a Pull Request.

### Feature Requests
Feature requests should be submitted in the issue tracker, with a description
of the expected behavior & use case, where they'll remain closed until sufficient interest (e.g. :+1: reactions).
Before submitting a feature request, please search for similar ones in the closed issues.

## License
Released under the [MIT License](https://github.com/eugeneford/collit/blob/master/LICENSE)
