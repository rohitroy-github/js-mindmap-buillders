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

  // Add resize circles on mouse enter
  rect.addEventListener("mouseenter", function () {
    let resizingHandlePositions = getResizingHandles(rect);

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
  rect.addEventListener("mouseleave", function () {
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
  if (element.tagName == "rect") {
    let elementX = parseFloat(element.getAttribute("x"));
    let elementY = parseFloat(element.getAttribute("y"));
    let elementWidth = parseFloat(element.getAttribute("width"));
    let elementHeight = parseFloat(element.getAttribute("height"));

    // Calculate the positions of the resize circles
    let resizingHandlePositions = [
      {x: elementX, y: elementY}, // Top-left
      {x: elementX + elementWidth / 2, y: elementY}, // Top-center
      {x: elementX + elementWidth, y: elementY}, // Top-right
      {x: elementX, y: elementY + elementHeight / 2}, // Left-center
      {x: elementX + elementWidth, y: elementY + elementHeight / 2}, // Right-center
      {x: elementX, y: elementY + elementHeight}, // Bottom-left
      {x: elementX + elementWidth / 2, y: elementY + elementHeight}, // Bottom-center
      {x: elementX + elementWidth, y: elementY + elementHeight}, // Bottom-right
    ];

    return resizingHandlePositions;
  }
}

let selectedRect = null; // variable to keep track of the selected rectangle
// let initialWidth;
// let initialHeight;
// let initialX;
// let initialY;

parentSVG.addEventListener("mousedown", function (event) {
  // Check if the clicked element is a rectangle
  if (event.target.tagName == "rect") {
    selectedRect = event.target;
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
  let selectedRectBBox = selectedRect.getBBox();
  // getCurrentMousePosition
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  // getGapFromMousePositionAndRectEdge
  let selectedRectXGap = mouseX - selectedRectBBox.x;
  let selectedRectYGap = mouseY - selectedRectBBox.y;

  // Determine which edge or corner is being hovered on
  const edgeSize = 10;
  const isLeft = selectedRectXGap < edgeSize;
  const isRight = selectedRectXGap > selectedRectBBox.width - edgeSize;
  const isTop = selectedRectYGap < edgeSize;
  const isBottom = selectedRectYGap > selectedRectBBox.height - edgeSize;

  // Get the initial rectangle position and dimensions
  let initialX = parseFloat(selectedRect.getAttribute("x"));
  let initialY = parseFloat(selectedRect.getAttribute("y"));
  let initialWidth = parseFloat(selectedRect.getAttribute("width"));
  let initialHeight = parseFloat(selectedRect.getAttribute("height"));

  // Calculate the distances from the mouse position to each edge and corner
  let distances = {
    left: mouseX - initialX,
    right: initialX + initialWidth - mouseX,
    top: mouseY - initialY,
    bottom: initialY + initialHeight - mouseY,
    topLeft: Math.sqrt(
      Math.pow(mouseX - initialX, 2) + Math.pow(mouseY - initialY, 2)
    ),
    topRight: Math.sqrt(
      Math.pow(mouseX - (initialX + initialWidth), 2) +
        Math.pow(mouseY - initialY, 2)
    ),
    bottomLeft: Math.sqrt(
      Math.pow(mouseX - initialX, 2) +
        Math.pow(mouseY - (initialY + initialHeight), 2)
    ),
    bottomRight: Math.sqrt(
      Math.pow(mouseX - (initialX + initialWidth), 2) +
        Math.pow(mouseY - (initialY + initialHeight), 2)
    ),
  };

  // Find the edge or corner closest to the mouse position
  let closestEdge = Object.keys(distances).reduce((a, b) =>
    distances[a] < distances[b] ? a : b
  );

  // Calculate the new rectangle dimensions based on the closest edge or corner
  let newWidth, newHeight, newX, newY;

  switch (closestEdge) {
    case "left":
      if (isLeft) {
        // console.log("left");
        newWidth = initialWidth + (initialX - mouseX);
        newHeight = initialHeight;
        newX = mouseX;
        newY = initialY;
        break;
      }
    case "right":
      if (isRight) {
        // console.log("right");
        newWidth = mouseX - initialX;
        newHeight = initialHeight;
        newX = initialX;
        newY = initialY;
        break;
      }
    case "top":
      if (isTop) {
        // console.log("top");
        newWidth = initialWidth;
        newHeight = initialHeight + (initialY - mouseY);
        newX = initialX;
        newY = mouseY;
        break;
      }
    case "bottom":
      if (isBottom) {
        // console.log("bottom");
        newWidth = initialWidth;
        newHeight = mouseY - initialY;
        newX = initialX;
        newY = initialY;
        break;
      }
    case "topLeft":
      if (isTop && isLeft) {
        // console.log("topLeft");
        newWidth = initialWidth + (initialX - mouseX);
        newHeight = initialHeight + (initialY - mouseY);
        newX = mouseX <= initialX ? mouseX : initialX;
        newY = mouseY <= initialY ? mouseY : initialY;
        break;
      }
    case "topRight":
      if (isTop && isRight) {
        // console.log("topRight");
        newWidth = mouseX - initialX;
        newHeight = initialHeight + (initialY - mouseY);
        newX = initialX;
        newY = mouseY;
        break;
      }
    case "bottomLeft":
      if (isBottom && isLeft) {
        // console.log("bottomLeft");
        newWidth = initialWidth + (initialX - mouseX);
        newHeight = mouseY - initialY;
        newX = mouseX;
        newY = initialY;
        break;
      }
    case "bottomRight":
      if (isBottom && isRight) {
        // console.log("bottomRight");
        newWidth = mouseX - initialX;
        newHeight = mouseY - initialY;
        newX = initialX;
        newY = initialY;
        break;
      }
    default:
      newWidth = initialWidth;
      newHeight = initialHeight;
      newX = initialX;
      newY = initialY;
      break;
  }

  //updateNewDimentions
  selectedRect.setAttribute("width", newWidth);
  selectedRect.setAttribute("height", newHeight);
  selectedRect.setAttribute("x", newX);
  selectedRect.setAttribute("y", newY);
}

// Add event listener for "mouseup" on the SVG element
parentSVG.addEventListener("mouseup", function (event) {
  // Remove the "mousemove" event listener
  parentSVG.removeEventListener("mousemove", elementResizingHandler);
  // Reset the selectedRect variable
  selectedRect = null;
});

// functionToShowResizingCursors
parentSVG.addEventListener("mousemove", showResizingCursors);
function showResizingCursors(event) {
  let hoveredElement = event.target;

  if (hoveredElement.tagName == "rect") {
    const cursorOnEdge = isCursorNearEdge(event);

    if (
      (cursorOnEdge.isTop && cursorOnEdge.isLeft) ||
      (cursorOnEdge.isBottom && cursorOnEdge.isRight)
    ) {
      hoveredElement.style.cursor = "nwse-resize";
    } else if (
      (cursorOnEdge.isTop && cursorOnEdge.isRight) ||
      (cursorOnEdge.isBottom && cursorOnEdge.isLeft)
    ) {
      hoveredElement.style.cursor = "nesw-resize";
    } else if (cursorOnEdge.isTop || cursorOnEdge.isBottom) {
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
  if (hoveredElement.tagName == "rect") {
    const edgeSize = 10;
    // Get the rect element and its bounding box
    const bbox = hoveredElement.getBBox();
    //GetRelativeMousePositions
    const XFromHoveredElementX = event.clientX - bbox.x;
    const YFromHoveredElementY = event.clientY - bbox.y;
    // whichEdgeIsHovered?
    result.isLeft = XFromHoveredElementX < edgeSize;
    result.isRight = XFromHoveredElementX > bbox.width - edgeSize;
    result.isTop = YFromHoveredElementY < edgeSize;
    result.isBottom = YFromHoveredElementY > bbox.height - edgeSize;
  }
  return result;
}
