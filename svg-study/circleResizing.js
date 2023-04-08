let parentSVG = document.getElementById("mainSVG");
let addRectBtn = document.getElementById("addRectBtn");

addCircleBtn.addEventListener("click", function () {
  // Create SVG rect element
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "100");
  circle.setAttribute("cy", "100");
  circle.setAttribute("r", "50");
  circle.setAttribute("fill", "blue");

  // Add circle element to the SVG container
  parentSVG.appendChild(circle);

  // Add resize circles on mouse enter
  circle.addEventListener("mouseenter", function () {
    let resizingHandlePositions = getResizingHandles(circle);

    // Add the circles to the rect
    resizingHandlePositions.forEach((pos) => {
      var circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", pos.x);
      circle.setAttribute("cy", pos.y);
      circle.setAttribute("r", "5");
      circle.setAttribute("fill", "white");
      circle.setAttribute("stroke", "black");
      circle.setAttribute("stroke-width", "1");
      circle.setAttribute("id", "resizingPoint");
      parentSVG.appendChild(circle);
    });
  });

  // Remove resize circles on mouse leave
  circle.addEventListener("mouseleave", function () {
    // console.log("mouseleave");
    let resizeCircles = parentSVG.querySelectorAll(
      "circle[id='resizingPoint']"
    );
    resizeCircles.forEach((circle) => {
      parentSVG.removeChild(circle);
    });
  });
});

function getResizingHandles(element) {
  if (element.tagName === "circle") {
    let elementX = parseFloat(element.getAttribute("cx"));
    let elementY = parseFloat(element.getAttribute("cy"));
    let elementRadius = parseFloat(element.getAttribute("r"));

    // Calculate the positions of the resize circles
    let resizingHandlePositions = [
      {x: elementX - elementRadius, y: elementY}, // Left
      {x: elementX + elementRadius, y: elementY}, // Right
      {x: elementX, y: elementY - elementRadius}, // Top
      {x: elementX, y: elementY + elementRadius}, // Bottom
    ];

    return resizingHandlePositions;
  }
}

let selectedElement = null; // variable to keep track of the selected rectangle

parentSVG.addEventListener("mousedown", function (event) {
  // Check if the clicked element is a rectangle
  if (event.target.tagName == "circle") {
    selectedElement = event.target;
    const cursorOnEdge = isCursorNearEdge(event);
    if (
      cursorOnEdge.isLeft ||
      cursorOnEdge.isRight ||
      cursorOnEdge.isTop ||
      cursorOnEdge.isBottom
    ) {
      parentSVG.addEventListener("mousemove", elementResizingHandler);
    }
  }
});

function elementResizingHandler(event) {
  // getCurrentMousePosition
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Get the initial circle position and radius
  const initialX = parseFloat(selectedElement.getAttribute("cx"));
  const initialY = parseFloat(selectedElement.getAttribute("cy"));
  const initialRadius = parseFloat(selectedElement.getAttribute("r"));

  // Calculate the distance from the mouse position to the center of the circle
  const distanceFromCenter = Math.sqrt(
    Math.pow(mouseX - initialX, 2) + Math.pow(mouseY - initialY, 2)
  );

  // Calculate the new circle radius based on the distance from the mouse position to the center
  const newRadius = distanceFromCenter;

  // Update the new circle radius
  selectedElement.setAttribute("r", newRadius);

  // const nodeIndex = nodes.findIndex((node) => node.node === selectedCircle);
  // nodes[nodeIndex].r = newRadius;
  // nodes[nodeIndex].cx = initialX;
  // nodes[nodeIndex].cy = initialY;

  // redrawSVGCanvas();
}

// Add event listener for "mouseup" on the SVG element
parentSVG.addEventListener("mouseup", function (event) {
  // Remove the "mousemove" event listener
  parentSVG.removeEventListener("mousemove", elementResizingHandler);
  // Reset the selectedRect variable
  selectedElement = null;
});

// functionToShowResizingCursors
parentSVG.addEventListener("mousemove", showResizingCursors);
function showResizingCursors(event) {
  let hoveredElement = event.target;

  if (hoveredElement.tagName == "circle") {
    const cursorOnEdge = isCursorNearEdge(event);

    if (cursorOnEdge.isTop || cursorOnEdge.isBottom) {
      hoveredElement.style.cursor = "ns-resize";
    } else if (cursorOnEdge.isLeft || cursorOnEdge.isRight) {
      hoveredElement.style.cursor = "ew-resize";
    } else {
      hoveredElement.style.cursor = "move";
    }
  }
}

function isCursorNearEdge(event) {
  let hoveredElement = event.target;
  let result = {
    isLeft: false,
    isRight: false,
    isTop: false,
    isBottom: false,
  };
  if (hoveredElement.tagName == "circle") {
    const edgeSize = 10;
    const bbox = hoveredElement.getBBox();
    // Get the position of the cursor relative to the center of the circle
    const relX = event.clientX - (bbox.x + bbox.width / 2);
    const relY = event.clientY - (bbox.y + bbox.height / 2);
    // Calculate the distance from the center of the circle to the cursor position
    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);
    // Check if the distance is within the edge size
    if (distanceFromCenter < bbox.width / 2 + edgeSize) {
      // Check which edge is being hovered over
      result.isLeft = relX < -bbox.width / 2 + edgeSize;
      result.isRight = relX > bbox.width / 2 - edgeSize;
      result.isTop = relY < -bbox.height / 2 + edgeSize;
      result.isBottom = relY > bbox.height / 2 - edgeSize;
    }
  }
  return result;
}
