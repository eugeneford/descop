describe("Descop", function () {
  var descop, dom;
  var parser = new DOMParser();
  var html = "<!DOCTYPE html><title>Example</title><script>var a = function(){};\n    </script><div id='id1'\nclass='cl1'>text</div><div></div><div></div>&amp;<div id='id2'> Hello World</div>";

  beforeEach(function () {
    descop = new Descop();
    dom = parser.parseFromString(html, "text/html");
    descop.connectSource(html);
    descop.connectDocument(dom);
  });

  describe("connectSource(html)", function () {
    it("Connected new html source", function () {
      var newHTML = "<!DOCTYPE html><title>1</title>";
      descop.connectSource(newHTML);
      expect(descop.getSource()).toEqual(newHTML);
    });

    it("Threw a TypeError when html was not a String", function () {
      expect(function () {
        descop.connectSource(1)
      }).toThrowError(TypeError);
    });
  });

  describe("connectDocument(document)", function () {
    it("Connected new document", function () {
      var dom = parser.parseFromString("<!DOCTYPE html><title>1</title>", "text/html");
      descop.connectDocument(dom);
      expect(descop.getDocument()).toEqual(dom);
    });

    it("Threw a TypeError when document was not a DOCUMENT_NODE", function () {
      expect(function () {
        descop.connectDocument(1)
      }).toThrowError(TypeError);
    });
  });

  describe("findFragmentPosition(fragment, fromIndex)", function () {
    it("Threw an error when html source was not connected", function () {
      descop = new Descop();
      expect(function () {
        descop.findFragmentPosition("<div id=\"id1\" class=\"cl1\">text</div>")
      })
        .toThrowError(Error);
    });

    it("Threw a TypeError when fragment was not a String", function () {
      expect(function () {
        descop.findFragmentPosition(1)
      }).toThrowError(TypeError);
    });

    it("Returned correct position for #id1", function () {
      expect(descop.findFragmentPosition("<div id=\"id1\" class=\"cl1\">text</div>"))
        .toEqual({start: 80, end: 116});
    });

    it("Returned a correct div based on fromIndex value", function () {
      expect(descop.findFragmentPosition("<div></div>", 122))
        .toEqual({start: 127, end: 138});
    });

    it("Returned a correct position if fragment contains extra whitespaces", function () {
      expect(descop.findFragmentPosition('<script>var a = function(){};      </script>'))
        .toEqual({start: 37, end: 80});
    });

    it("Returned a correct position if fragment contains trailing whitespaces", function () {
      expect(descop.findFragmentPosition('<title>Example</title>     '))
        .toEqual({start: 15, end: 37});
    });

    it("Returned null when fragment was not found", function () {
      expect(descop.findFragmentPosition("<h1></h1>"))
        .toBe(null);
    });
  });

  describe("findFragment(fragment, fromIndex)", function () {
    it("Returned a correct fragment for #id2", function () {
      expect(descop.findFragment("<div id=\"id2\">Hello World</div>"))
        .toEqual("<div id='id2'> Hello World</div>");
    });

    it("Returned null when fragment was not found", function () {
      expect(descop.findFragment("<h1></h1>"))
        .toBe(null);
    });
  });

  describe("findElementPosition(element)", function () {
    it("Returned a correct position for #id2", function () {
      var element = dom.getElementById("id2");
      expect(descop.findElementPosition(element))
        .toEqual({start: 143, end: 175});
    });

    it("Threw an Error when document was not connected", function () {
      descop = new Descop();
      var element = dom.getElementById("id2");
      expect(function () {
        descop.findElementPosition(element)
      }).toThrowError(Error);
    });

    it("Threw a TypeError when element was not an ELEMENT_NODE", function () {
      expect(function () {
        descop.findElementPosition(1)
      }).toThrowError(TypeError);
    });

    it("Threw an Error when element was not a part of connected Document", function () {
      var element = dom.createElement("div");
      expect(function () {
        descop.findElementPosition(element)
      }).toThrowError(Error);
    });

    it("Threw an Error for dynamically changed document", function () {
      var element = dom.getElementById("id2");
      var newElement = dom.createElement("div");
      dom.body.insertBefore(newElement, dom.body.firstChild);
      expect(function () {
        descop.findElementPosition(element)
      }).toThrowError(Error);
    });
  });

  describe("findElement(element)", function () {
    it("Returned a correct fragment for #id2", function () {
      var element = dom.getElementById("id2");
      expect(descop.findElement(element))
        .toEqual("<div id='id2'> Hello World</div>");
    });
  });
});
