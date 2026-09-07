// HTML source is the markup that defines the document.
// The browser's HTML parser reads/parses that markup and builds the DOM, an object-based model of the document that JavaScript can access and manipulate.

// The browser doesn't create a flat list of elements. It creates a tree of nodes based on the HTML structure.
// Every Element is a Node, but not every Node is an Element.
// text is also represented as a node

// ===========================================methods()================================

// querySelectorAll()
// → CSS selector
// → NodeList
// → static

// getElementsByClassName()
// → class name
// → HTMLCollection
// → live

// getElementsByTagName()
// → tag name
// → HTMLCollection
// → live

const nodeList = document.querySelectorAll(".card");
console.log(nodeList);
const collection = document.getElementsByClassName("card");
console.log(collection);
