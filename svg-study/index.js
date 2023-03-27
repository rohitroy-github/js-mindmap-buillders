// definitions/initializations
const svg = document.getElementById("mainSVG");

const nodes = [];

// def : addANewNode
const addRectBtn = document.getElementById("addNode");
// addRectBtn.addEventListener("click", addRect);

// function addRect() {
//   // Create the SVG rectangle node
//   const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//   rect.setAttribute("x", "50");
//   rect.setAttribute("y", "50");
//   rect.setAttribute("width", "100");
//   rect.setAttribute("height", "50");
//   rect.setAttribute("fill", "lightblue");

//   svg.appendChild(rect);

//   const rectSelected = document.querySelector("rect");

//   const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//   const rectBBox = rect.getBBox();

//   // Calculate the center point of the rect
//   const centerX = rectBBox.x + rectBBox.width / 2;
//   const centerY = rectBBox.y + rectBBox.height / 2;

//   text.setAttribute("x", centerX);
//   text.setAttribute("y", centerY);
//   text.setAttribute("font-family", "Montserrat");
//   text.setAttribute("contenteditable", "true");

//   text.textContent = "Node";

//   text.setAttribute("fill", "black");
//   // Add the rectangle to the SVG container

//   rectSelected.parentNode.insertBefore(text, rectSelected.nextSibling);
// }
// def : addANewNode END

addRectBtn.addEventListener("click", function () {
  // Create the SVG rectangle node
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "50");
  rect.setAttribute("y", "50");
  rect.setAttribute("width", "100");
  rect.setAttribute("height", "50");
  rect.setAttribute("fill", "lightblue");

  svg.appendChild(rect);

  // Create the foreignObject element
  const foreignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  foreignObject.setAttribute("x", "60");
  foreignObject.setAttribute("y", "60");
  foreignObject.setAttribute("width", "80");
  foreignObject.setAttribute("height", "30");

  // Create the HTML input element
  const input = document.createElement("input");
  input.setAttribute("default", "Node");
  input.setAttribute(
    "style",
    "width: 100%; height: 100%; box-sizing: border-box; padding: 5px;"
  );
  input.setAttribute("value", "Enter Text Here");

  // Add a blur event listener to the input element to update the SVG text element
  input.addEventListener("blur", function () {
    text.textContent = input.value;
  });

  // Create the SVG text element
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "100");
  text.setAttribute("y", "75");
  text.setAttribute("font-size", "20");
  text.setAttribute("font-family", "sans-serif");
  text.setAttribute("fill", "black");
  text.setAttribute("text-anchor", "middle");

  // Add the HTML input element to the foreignObject element
  foreignObject.appendChild(input);

  // Add the foreignObject element to the rectangle
  rect.appendChild(foreignObject);

  // Add the text element to the rectangle
  rect.appendChild(text);

  const rectSelected = document.querySelector("rect");
  rectSelected.parentNode.insertBefore(text, rectSelected.nextSibling);

  // Add the rectangle to the SVG container
  // svg.appendChild(rect);
});
