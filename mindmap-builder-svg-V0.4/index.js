// definitions/initializations
const svg = document.getElementById("mainSVG");

const nodes = [];
const edges = [];

// Define the grid size
const gridSize = 30;

// def : addEventListener for dragging/selection/edgeCreation
svg.addEventListener("mousedown", startDrag);
svg.addEventListener("mousemove", drag);
svg.addEventListener("mouseup", stopDrag);
// def : addEventListener END

// def : addANewNode/Rect
const addRectBtn = document.getElementById("addRect");
addRectBtn.addEventListener("click", addRect);

function addRect() {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  let newNode = {
    nodeSelected: false,
    node: rect,
    id: `${new Date().getTime()}`,
    x: 50,
    y: 50,
    width: 100,
    height: 60,
  };

  nodes.push(newNode);

  // Redraw the SVG canvas
  redrawSVGCanvas();
}
// def : addANewNode/Rect END

// def : addANewNode/Square
const addSquareBtn = document.getElementById("addSquare");
addSquareBtn.addEventListener("click", addSquare);

function addSquare() {
  let square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  let newNode = {
    nodeSelected: false,
    node: square,
    id: `${new Date().getTime()}`,
    x: 50,
    y: 50,
    width: 60,
    height: 60,
  };

  nodes.push(newNode);

  redrawSVGCanvas();
}
// def : addANewNode/Square END

// def : addANewNode/Circle
const addCircleBtn = document.getElementById("addCircle");
addCircleBtn.addEventListener("click", addCircle);

function addCircle() {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  let newNode = {
    nodeSelected: false,
    node: circle,
    id: `${new Date().getTime()}`,
    x: 75,
    y: 75,
    radius: 30,
  };

  nodes.push(newNode);

  redrawSVGCanvas();
}
// def : addANewNode/Circle END

// def : draggingModules
var selection = null;

let isDragging = false;
let currentRect = null;
let currentEdge = null;
let initialX;
let initialY;

function startDrag(event) {
  // Prevent default behavior to prevent selecting text or images
  event.preventDefault();

  // ifSelectedTarget === 'rect'
  if (event.target.nodeName === "rect") {
    console.log("entered-rect");

    // Set the current rectangle element and its initial position
    currentRect = event.target;
    initialX = event.clientX;
    initialY = event.clientY;
    isDragging = true;

    if (selection && selection !== currentRect) {
      edges.push({
        id: `${new Date().getTime()}`,
        nodes: event.target.nodeName,
        from: {
          node: selection,
          id: selection.id,
          x: parseInt(selection.getAttribute("x")),
          y: parseInt(selection.getAttribute("y")),
          width: parseInt(selection.getAttribute("width")),
          height: parseInt(selection.getAttribute("height")),
        },
        to: {
          node: currentRect,
          id: currentRect.id,
          x: parseInt(currentRect.getAttribute("x")),
          y: parseInt(currentRect.getAttribute("y")),
          width: parseInt(currentRect.getAttribute("width")),
          height: parseInt(currentRect.getAttribute("height")),
        },
        edgeSelected: false,
      });

      deselect();
      selection = currentEdge;
    }

    selection = currentRect;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes[i].nodeSelected = "true";
        break;
      }
    }
    redrawSVGCanvas();
  }

  // ifSelectedTarget === 'circle'
  if (event.target.nodeName === "circle") {
    console.log("entered-circle");

    // Set the current rectangle element and its initial position
    currentRect = event.target;
    initialX = event.clientX;
    initialY = event.clientY;
    isDragging = true;

    if (selection && selection !== currentRect) {
      edges.push({
        id: `${new Date().getTime()}`,
        nodes: event.target.nodeName,
        from: {
          node: selection,
          id: selection.id,
          x: parseInt(selection.getAttribute("cx")),
          y: parseInt(selection.getAttribute("cy")),
          radius: parseInt(selection.getAttribute("r")),
        },
        to: {
          node: currentRect,
          id: currentRect.id,
          x: parseInt(currentRect.getAttribute("cx")),
          y: parseInt(currentRect.getAttribute("cy")),
          radius: parseInt(currentRect.getAttribute("r")),
        },
        edgeSelected: false,
      });

      deselect();
      selection = currentEdge;
    }

    selection = currentRect;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes[i].nodeSelected = "true";
        break;
      }
    }
    redrawSVGCanvas();
  }

  if (event.target.nodeName === "line") {
    console.log("entered-edge");
    currentEdge = event.target;
    // ifAnEdgeIsSelected
    // Highlight the clicked edge
    selection = currentEdge;
    selection.edgeSelected = true;
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id === currentEdge.id) {
        edges[i].edgeSelected = "true";
        break;
      }
    }
    redrawSVGCanvas();
  }

  if (event.target.nodeName === "svg") {
    console.log("entered-default");

    deselect();

    redrawSVGCanvas();
  }
}

function drag(event) {
  // Prevent default behavior to prevent selecting text or images
  event.preventDefault();

  showResizingCursors(event);

  // Check if the rectangle element is being dragged
  if (isDragging) {
    // Calculate the new position of the rectangle element
    const dx = event.clientX - initialX;
    const dy = event.clientY - initialY;

    const newX = parseInt(currentRect.getAttribute("x")) + dx;
    const newY = parseInt(currentRect.getAttribute("y")) + dy;

    // Set the new position of the rectangle element
    currentRect.setAttribute("x", newX);
    currentRect.setAttribute("y", newY);

    // Update the initial position for the next drag event
    initialX = event.clientX;
    initialY = event.clientY;

    // update the node's position in the nodes array
    const nodeIndex = nodes.findIndex((node) => node.node === currentRect);
    nodes[nodeIndex].x = newX;
    nodes[nodeIndex].y = newY;

    // update the positions of edges in the edges array
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.from.node === currentRect) {
        edge.from.x = newX;
        edge.from.y = newY;
      } else if (edge.to.node === currentRect) {
        edge.to.x = newX;
        edge.to.y = newY;
      }
    }

    redrawSVGCanvas();
  }
}

function stopDrag(event) {
  // Set the isDragging flag to false
  isDragging = false;

  if (event.target.nodeName == "circle") {
    const newX =
      Math.round(parseInt(currentRect.getAttribute("x")) / gridSize) * gridSize;
    const newY =
      Math.round(parseInt(currentRect.getAttribute("y")) / gridSize) * gridSize;

    // Set the new position of the rectangle element
    currentRect.setAttribute("x", newX);
    currentRect.setAttribute("y", newY);

    // Update the node's position in the nodes array
    const nodeIndex = nodes.findIndex((node) => node.node === currentRect);
    nodes[nodeIndex].x = newX;
    nodes[nodeIndex].y = newY;

    // Update the positions of edges in the edges array
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.from.node === currentRect) {
        edge.from.x = newX;
        edge.from.y = newY;
      } else if (edge.to.node === currentRect) {
        edge.to.x = newX;
        edge.to.y = newY;
      }
    }
  }

  if (event.target.nodeName == "rect") {
    const rectX = parseFloat(currentRect.getAttribute("x"));
    const rectY = parseFloat(currentRect.getAttribute("y"));
    const snappedX = Math.round(rectX / gridSize) * gridSize;
    const snappedY = Math.round(rectY / gridSize) * gridSize;

    // Set the new position of the rectangle element
    currentRect.setAttribute("x", snappedX);
    currentRect.setAttribute("y", snappedY);

    // update the node's position in the nodes array
    const nodeIndex = nodes.findIndex((node) => node.node === currentRect);
    nodes[nodeIndex].x = snappedX;
    nodes[nodeIndex].y = snappedY;

    // update the positions of edges in the edges array
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.from.node === currentRect) {
        edge.from.x = snappedX;
        edge.from.y = snappedY;
      } else if (edge.to.node === currentRect) {
        edge.to.x = snappedX;
        edge.to.y = snappedY;
      }
    }
  }

  redrawSVGCanvas();
}
// def : draggingModules END

// code : function : deselectANode
function deselect() {
  if (selection && selection.nodeName === "rect") {
    console.log("deselect-fired-rect");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes[i].nodeSelected = "false";
        break;
      }
    }
  } else if (selection && selection.nodeName === "line") {
    console.log("deselect-fired-edge");
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id === selection.id) {
        edges[i].edgeSelected = "false";
        break;
      }
    }
  } else if (selection && selection.nodeName === "circle") {
    console.log("deselect-fired-circle");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes[i].nodeSelected = "false";
        break;
      }
    }
  }

  selection = null;
}
// code : function : deselectANode END

// def : function/ button : fetchCurrentNodesData
const nodesData = document.getElementById("nodesData");
nodesData.addEventListener("click", getNodesData);

function getNodesData() {
  console.log("Nodes data >>>");

  console.log(nodes);
}
// def : function/ button : fetchCurrentNodesData END

// code : function/ button : fetchCurrentEdgesData
const edgesData = document.getElementById("edgesData");
edgesData.addEventListener("click", getEdgesData);

function getEdgesData() {
  console.log("Edges data >>>");

  console.log(edges);
}
// code : function/ button : fetchCurrentEdgesData END

// code : function/button : clearWholeCanvas | reInitializeArrays
const resetBtn = document.getElementById("resetCanvas");
resetBtn.addEventListener("click", clearCanvas);

function clearCanvas() {
  svg.innerHTML = "";

  console.log("success : canvas-reset");

  nodes.length = 0;
  edges.length = 0;

  nodes = [];
  edges = [];
}
// code : function/button : clearWholeCanvas | reInitializeArrays END

// code : function/button : deleteSelectedEdge | updateArrays
const deleteEdgeBtn = document.getElementById("deleteEdge");
deleteEdgeBtn.addEventListener("click", deleteEdge);

function deleteEdge() {
  if (selection && selection.nodeName == "line") {
    // ifAEdgeHasBeenSelected
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id === selection.id) {
        edges.splice(i, 1);
      }
    }
    selection = null;
    // redrawTheNodesAndEdgesWithNewArrayCredentials
    redrawSVGCanvas();
    console.log("delete-success : edge-deleted");
  } else {
    console.log("delete-falied : no-edge-selected");
  }
}
// code : function/button : deleteSelectedEdge | updateArrays END

// code : function/button : deleteSelectedNode | updateArrays
const deleteNodeBtn = document.getElementById("deleteNode");
deleteNodeBtn.addEventListener("click", deleteNode);

function deleteNode() {
  if (
    (selection && selection.nodeName == "rect") ||
    selection.nodeName == "circle"
  ) {
    // ifANodeHasBeenSelected

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes.splice(i, 1);
      }
    }
    // remove edges associated with node
    for (let i = 0; i < edges.length; i++) {
      if (
        edges[i].from.id === selection.id ||
        edges[i].to.id === selection.id
      ) {
        edges.splice(i, 1);
        i--; // decrement index because we just removed an element
      }
    }
    selection = null;
    // redrawTheNodesAndEdgesWithNewArrayCredentials
    redrawSVGCanvas();
    console.log("delete-success : node-deleted");
  } else {
    console.log("delete falied : no-node-selected");
  }
}
// code : function/button : deleteSelectedNode | updateArrays END

// def/function : redraw SVGContainer / canvas
function redrawSVGCanvas() {
  svg.innerHTML = "";

  // redrawEdges
  for (let i = 0; i < edges.length; i++) {
    const fromNode = edges[i].from;
    const toNode = edges[i].to;

    let fromX;
    let fromY;
    let toX;
    let toY;

    console.log(edges[i].nodes);

    // fetch[x, y]Of[fromNode, toNode]
    if (edges[i].nodes === "rect") {
      fromX = fromNode.x + fromNode.width / 2;
      fromY = fromNode.y + fromNode.height / 2;
      toX = toNode.x + toNode.width / 2;
      toY = toNode.y + toNode.height / 2;
    } else if (edges[i].nodes === "circle") {
      // fromX = fromNode.x + fromNode.radius / 2;
      // fromY = fromNode.y + fromNode.radius / 2;
      fromX = fromNode.x;
      fromY = fromNode.y;
      toX = toNode.x;
      toY = toNode.y;
    }

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromX);
    line.setAttribute("y1", fromY);
    line.setAttribute("x2", toX);
    line.setAttribute("y2", toY);
    if (edges[i].edgeSelected === "true") {
      line.setAttribute("stroke", "red");
    } else {
      line.setAttribute("stroke", "black");
    }
    line.setAttribute("id", edges[i].id);
    line.setAttribute("edgeSelected", edges[i].edgeSelected);

    // Add the line element to the SVG element
    svg.appendChild(line);
  }

  // redrawRectNodes
  for (let i = 0; i < nodes.length; i++) {
    let rect = nodes[i].node;
    rect.setAttribute("x", nodes[i].x);
    rect.setAttribute("y", nodes[i].y);
    rect.setAttribute("width", nodes[i].width);
    rect.setAttribute("height", nodes[i].height);
    if (nodes[i].nodeSelected === "true") {
      rect.setAttribute("stroke", "red");
    } else {
      rect.setAttribute("stroke", "black");
    }
    rect.setAttribute("id", nodes[i].id);
    rect.setAttribute("nodeSelected", nodes[i].nodeSelected);

    // Add the rect element to the SVG element
    svg.appendChild(rect);

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
        if (nodes[i].nodeSelected === "true") {
          circle.setAttribute("stroke", "red");
        } else {
          circle.setAttribute("stroke", "black");
        }
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("id", "resizingPoint");
        svg.appendChild(circle);
      });
    });

    // removeResizingHandlers
    rect.addEventListener("mouseleave", function () {
      // console.log("mouseleave");
      let resizeCircles = svg.querySelectorAll("circle[id='resizingPoint']");
      resizeCircles.forEach((circle) => {
        svg.removeChild(circle);
      });
    });
  }

  // redrawCircleNodes
  for (let i = 0; i < nodes.length; i++) {
    let circle = nodes[i].node;
    circle.setAttribute("cx", nodes[i].x);
    circle.setAttribute("cy", nodes[i].y);
    circle.setAttribute("r", nodes[i].radius);
    if (nodes[i].nodeSelected === "true") {
      circle.setAttribute("stroke", "red");
    } else {
      circle.setAttribute("stroke", "black");
    }
    circle.setAttribute("id", nodes[i].id);
    circle.setAttribute("nodeSelected", nodes[i].nodeSelected);

    // Add the rect element to the SVG element
    svg.appendChild(circle);
  }
}
// def/function : END

// resizingModules

// showResizingCursorsOnElementHover
function showResizingCursors(event) {
  const edgeSize = 10;
  let hoveredElement = event.target;
  // Get the rect element and its bounding box
  const bbox = hoveredElement.getBBox();

  if (hoveredElement.tagName == "rect") {
    //GetRelativeMousePositions
    const XFromHoveredElementX = event.clientX - bbox.x;
    const YFromHoveredElementY = event.clientY - bbox.y;
    // whichEdgeIsHovered?
    const isLeft = XFromHoveredElementX < edgeSize;
    const isRight = XFromHoveredElementX > bbox.width - edgeSize;
    const isTop = YFromHoveredElementY < edgeSize;
    const isBottom = YFromHoveredElementY > bbox.height - edgeSize;

    // setCursorBasedOnEdge/CornerBeingHovered
    if ((isTop && isLeft) || (isBottom && isRight)) {
      hoveredElement.style.cursor = "nwse-resize";
    } else if ((isTop && isRight) || (isBottom && isLeft)) {
      hoveredElement.style.cursor = "nesw-resize";
    } else if (isTop || isBottom) {
      hoveredElement.style.cursor = "ns-resize";
    } else if (isLeft || isRight) {
      hoveredElement.style.cursor = "ew-resize";
    } else {
      hoveredElement.style.cursor = "move";
    }
  }
}

// getPositionsForResizeHandlers
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

// resizingModules : END
