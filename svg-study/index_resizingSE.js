let parentSVG = document.getElementById("mainSVG");

let addRectBtn = document.getElementById("addRectBtn");

addRectBtn.addEventListener("click", function () {
  // Create SVG rect element
  var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "100");
  rect.setAttribute("y", "100");
  rect.setAttribute("width", "100");
  rect.setAttribute("height", "60");
  rect.setAttribute("fill", "blue");

  // Add rect element to the SVG container
  parentSVG.appendChild(rect);
});

let selectedRect = null; // variable to keep track of the selected rectangle
let initialWidth;
let initialHeight;
let initialX;
let initialY;

// Add event listener for "mousedown" on the SVG element
parentSVG.addEventListener("mousedown", function (event) {
  // Check if the clicked element is a rectangle
  if (event.target.tagName == "rect") {
    // Set the selectedRect variable to the clicked rectangle
    selectedRect = event.target;

    // Get the initial mouse position
    initialX = event.clientX;
    initialY = event.clientY;

    // Get the initial rectangle dimensions
    initialWidth = parseFloat(selectedRect.getAttribute("width"));
    initialHeight = parseFloat(selectedRect.getAttribute("height"));

    // Add event listener for "mousemove" on the SVG element
    parentSVG.addEventListener("mousemove", mousemoveHandler);
  }
});

// Add event listener for "mouseup" on the SVG element
parentSVG.addEventListener("mouseup", function (event) {
  // Remove the "mousemove" event listener
  parentSVG.removeEventListener("mousemove", mousemoveHandler);

  // Reset the selectedRect variable
  selectedRect = null;
});

// Define a function to handle the mousemove event
function mousemoveHandler(event) {
  // Calculate the new rectangle dimensions based on the mouse position
  let newWidth = initialWidth + (event.clientX - initialX);
  let newHeight = initialHeight + (event.clientY - initialY);

  // Update the rectangle attributes with the new dimensions
  selectedRect.setAttribute("width", newWidth);
  selectedRect.setAttribute("height", newHeight);
}
