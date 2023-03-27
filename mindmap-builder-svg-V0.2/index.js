// definitions/initializations
const svg = document.getElementById("mainSVG");

const nodes = [];
const edges = [];

// def : addEventListener for dragging/selection/edgeCreation
svg.addEventListener("mousedown", startDrag);
svg.addEventListener("mousemove", drag);
svg.addEventListener("mouseup", stopDrag);
// def : addEventListener END

// def : addANewNode
const addRectBtn = document.getElementById("addNode");
addRectBtn.addEventListener("click", addRect);

function addRect() {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  let newNode = {
    nodeSelected: false,
    id: `${new Date().getTime()}`,
    x: 50,
    y: 50,
    width: 100,
    height: 60,
    node: rect,
    text: text,
  };

  nodes.push(newNode);

  redrawSVGCanvas();
}
// def : addANewNode END

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

  // Check if the event target is a rectangle element
  if (event.target.nodeName === "rect") {
    // console.log("entered node");

    // Set the current rectangle element and its initial position
    currentRect = event.target;
    initialX = event.clientX;
    initialY = event.clientY;
    isDragging = true;

    if (selection && selection !== currentRect) {
      edges.push({
        id: `${new Date().getTime()}`,
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
  if (event.target.nodeName === "line") {
    // console.log("entered edge");
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
    // console.log("entered default");

    deselect();

    redrawSVGCanvas();
  }
}
function drag(event) {
  // Prevent default behavior to prevent selecting text or images
  event.preventDefault();
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

  redrawSVGCanvas();
}
// def : draggingModules END

// code : function : deselectANode
function deselect() {
  if (selection && selection.nodeName === "rect") {
    console.log("deselect fired rect");
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === selection.id) {
        nodes[i].nodeSelected = "false";
        break;
      }
    }
  } else if (selection && selection.nodeName === "line") {
    console.log("deselect fired line");
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].id === selection.id) {
        edges[i].edgeSelected = "false";
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
  if (selection && selection.nodeName == "rect") {
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

    // Get the x and y coordinates of the from and to nodes
    const fromX = fromNode.x + fromNode.width / 2;
    const fromY = fromNode.y + fromNode.height / 2;
    const toX = toNode.x + toNode.width / 2;
    const toY = toNode.y + toNode.height / 2;

    // Create a new line element and set its attributes
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

  // redrawNodes
  for (let i = 0; i < nodes.length; i++) {
    let rect = nodes[i].node;

    rect.setAttribute("x", nodes[i].x);
    rect.setAttribute("y", nodes[i].y);
    rect.setAttribute("width", nodes[i].width);
    rect.setAttribute("height", nodes[i].height);
    rect.setAttribute("fill", "white");
    if (nodes[i].nodeSelected === "true") {
      rect.setAttribute("stroke", "red");
    } else {
      rect.setAttribute("stroke", "black");
    }
    rect.setAttribute("id", nodes[i].id);
    rect.setAttribute("nodeSelected", nodes[i].nodeSelected);

    // Add the rect element to the SVG element
    // svg.appendChild(rect);

    const foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    foreignObject.setAttribute("x", nodes[i].x);
    foreignObject.setAttribute("y", nodes[i].y - 10);
    foreignObject.setAttribute("width", 50);
    foreignObject.setAttribute("height", 50);

    // Create a new input element to use as the editable text field
    const block = document.createElement("div");

    // Set the attributes of the input element
    block.setAttribute("width", "100%");
    block.setAttribute("height", "100%");
    block.setAttribute(
      "style",
      "border: 2px solid black; padding: 10; margin: 0; bachground-color : blue"
    );

    // Add the input element to the foreignObject element
    foreignObject.appendChild(block);

    // Add the foreignObject element to the rect element
    // rect.appendChild(foreignObject);

    svg.appendChild(foreignObject);

    // svg.appendChild(rect);
  }
}
// def/function : END
