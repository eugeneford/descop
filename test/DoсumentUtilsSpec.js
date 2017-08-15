var DocumentUtils = Descop.DocumentUtils;
var testTemplate = "<!DOCTYPE html><html><head><title>Template</title><link rel=\"stylesheet\" href=\"style.css\"><script>var test = 10;</script><!-- Head Comment --></head><body><div id=\"test1\">Text</div>  <!-- Body Comment 1 --> Text <div id=\"test2\"></div></body></html>";

describe("DocumentUtils", function () {
  var parser = new DOMParser();

  describe("stringifyDocumentType(document)", function () {
    it("Threw an error when document was not a DOCUMENT_NODE", function () {
      expect(function () {
        DocumentUtils.stringifyDocumentType(document.createElement("div"))
      }).toThrowError(TypeError);
    });

    it("Successfully decoded html5 doctype to string", function () {
      var dom = parser.parseFromString("<!DOCTYPE html><title>HTML5</title>", "text/html");
      expect(DocumentUtils.stringifyDocumentType(dom)).toEqual("<!DOCTYPE html>");
    });

    it("Successfully decoded html4 strict doctype to string", function () {
      var dom = parser.parseFromString("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\"><title>HTML4 Strict</title>", "text/html");
      expect(DocumentUtils.stringifyDocumentType(dom)).toEqual("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">");
    });

    it("Successfully decoded html4 transitional doctype to string", function () {
      var dom = parser.parseFromString("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><title>HTML4 Strict</title>", "text/html");
      expect(DocumentUtils.stringifyDocumentType(dom)).toEqual("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">");
    });

    it("Successfully decoded html4 frameset doctype to string", function () {
      var dom = parser.parseFromString("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><title>HTML4 Strict</title>", "text/html");
      expect(DocumentUtils.stringifyDocumentType(dom)).toEqual("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">");
    });

    it("Returned null when doctype was not specified", function () {
      var dom = parser.parseFromString("<title>HTML</title>", "text/html");
      expect(DocumentUtils.stringifyDocumentType(dom)).toEqual(null);
    });
  });

  describe("isRootElement(element)", function () {
    it("Threw an error when element was not an ELEMENT_NODE", function () {
      expect(function () {
        DocumentUtils.isRootElement(1)
      }).toThrowError(TypeError);
    });

    it("Returned true for document.documentElement", function () {
      expect(DocumentUtils.isRootElement(document.documentElement)).toBe(true);
    });

    it("Returned false for document.body", function () {
      expect(DocumentUtils.isRootElement(document.body)).toBe(false);
    });
  });

  describe("getHTMLBeforeElement(element)", function () {
    var dom = parser.parseFromString(testTemplate, "text/html");
    console.log(DocumentUtils.stringifyDocumentType(dom) + dom.documentElement.outerHTML);

    it("Threw an error when element was not an ELEMENT_NODE", function () {
      expect(function () {
        DocumentUtils.getHTMLBeforeElement(document)
      }).toThrowError(TypeError);
    });

    it("Returned null for root element", function () {
      expect(DocumentUtils.getHTMLBeforeElement(document.documentElement)).toBe(null);
    });

    it("Returned a correct html part for <div id='test1'>. Open Console for document example", function(){
      expect(DocumentUtils.getHTMLBeforeElement(dom.getElementById("test1"))).toEqual("<!DOCTYPE html><html><head><title>Template</title><link rel=\"stylesheet\" href=\"style.css\"><script>var test = 10;</script><!-- Head Comment --></head><body>");
    });

    it("Returned a correct html part for <div id='test2'>. Open Console for document example", function(){
      expect(DocumentUtils.getHTMLBeforeElement(dom.getElementById("test2"))).toEqual("<!DOCTYPE html><html><head><title>Template</title><link rel=\"stylesheet\" href=\"style.css\"><script>var test = 10;</script><!-- Head Comment --></head><body><div id=\"test1\">Text</div>  <!-- Body Comment 1 --> Text ");
    });
  });
});
