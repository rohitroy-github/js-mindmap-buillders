// definingCanvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const leftCanvasBar = document.querySelector("#leftCanvasBar");

let nodes = [];
let edges = [];

// resizing
function resize() {
  // fixingCanvasDimentionsToWindowDimentions
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  // fixingCanvasDimentionsTo[leftCanvasBar]Dimentions
  canvas.width = leftCanvasBar.clientWidth;
  canvas.height = leftCanvasBar.clientHeight;
}

window.onresize = resize;
resize();

// def : drawNodeFunction
function draw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < edges.length; i++) {
    let fromNode = edges[i].from;
    let toNode = edges[i].to;
    context.beginPath();
    context.fillStyle = edges[i].edgeSelected ? "#FF0000" : "#22cccc";
    context.strokeStyle = edges[i].edgeSelected ? "#FF0000" : "#22cccc";
    context.lineWidth = fromNode.lineWidth;
    context.moveTo(fromNode.x, fromNode.y);
    context.lineTo(toNode.x, toNode.y);
    context.stroke();
  }

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    context.beginPath();
    context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
    context.strokeStyle = node.strokeStyle;
    context.lineWidth = node.lineWidth;
    context.fill();
    context.stroke();
  }
}

// def : onClickNode > drawACircle/NodeOnClickingOnCanvas
// function click(e) {
//   let node = {
//     x: e.x,
//     y: e.y,
//     radius: 10,
//     fillStyle: "#22cccc",
//     strokeStyle: "#009999",
//   };
//   nodes.push(node);
//   draw();
// }

// window.onclick = click;

// nodeMovement
var selection = undefined;

function withinANode(x, y) {
  return nodes.find((n) => {
    return (
      x > n.x - n.radius &&
      y > n.y - n.radius &&
      x < n.x + n.radius &&
      y < n.y + n.radius
    );
  });
}

// checkIfEdgeIsClicked?
// The function calculates the mouse coordinates relative to the canvas by subtracting the canvas's top-left corner from the event's clientX and clientY properties. It then loops over each edge in the edges array and calculates the distance between the mouse coordinates and the start and end points of the edge. If the sum of these distances minus the length of the edge is less than 5 (i.e., the mouse is within 5 pixels of the edge), the function returns the edge. Otherwise, it returns null.
function withinAnEdge(event) {
  const canvasRect = event.target.getBoundingClientRect();
  const mouseX = event.clientX - canvasRect.left;
  const mouseY = event.clientY - canvasRect.top;

  for (const edge of edges) {
    const distanceFromStart = distance(
      mouseX,
      mouseY,
      edge.from.x,
      edge.from.y
    );

    let edgeLength = distance(edge.from.x, edge.from.y, edge.to.x, edge.to.y);
    const distanceFromEnd = distance(mouseX, mouseY, edge.to.x, edge.to.y);
    const distanceAlongEdge = distanceFromStart + distanceFromEnd - edgeLength;

    if (distanceAlongEdge < 5) {
      return edge;
    }
  }

  return;
}

function move(e) {
  if (selection && e.buttons) {
    selection.x = e.x;
    selection.y = e.y;
    draw();
  }
}

function down(e) {
  // let targetNode = withinANode(e.x, e.y);
  // if (selection && selection.selected) {
  //   selection.selected = false;
  // }
  // if (targetNode) {
  //   if (selection && selection !== targetNode) {
  //     edges.push({from: selection, to: targetNode});
  //   }
  //   selection = targetNode;
  //   selection.selected = true;
  //   draw();
  // }

  // newCode
  let targetNode = withinANode(e.x, e.y);
  let targetEdge = withinAnEdge(e);

  if (selection && selection.selected) {
    selection.selected = false;
  }
  if (selection && selection.edgeSelected) {
    selection.edgeSelected = false;
  }
  if (targetNode) {
    console.log("entered node");
    // ifANodeIsSelected
    if (selection && selection !== targetNode) {
      edges.push({from: selection, to: targetNode, edgeSelected: false});
    }
    selection = targetNode;
    selection.selected = true;
    draw();
  } else if (targetEdge) {
    console.log("entered edge");

    // ifAnEdgeIsSelected
    // Highlight the clicked edge
    selection = targetEdge;
    selection.edgeSelected = true;

    draw();
  }
}

function up(e) {
  if (!selection) {
    let node = {
      x: e.x,
      y: e.y,
      radius: 10,
      fillStyle: "#22cccc",
      strokeStyle: "#009999",
      selectedFill: "#FF0000", //redOnSelection
      lineWidth: 5,
      selected: false,
    };
    nodes.push(node);
    draw();
  }
  if (selection && !selection.selected && !selection.edgeSelected) {
    // console.log("selection > ", selection);
    selection = undefined;
  }
  draw();
}

canvas.onmousemove = move;
canvas.onmousedown = down;
canvas.onmouseup = up;

// code : addNewNodeButton
const addNodeBtn = document.getElementById("addNode");
addNodeBtn.addEventListener("click", addNewNode);

function addNewNode() {
  let newNode = {
    x: 50,
    y: 50,
    radius: 10,
    fillStyle: "#22cccc",
    strokeStyle: "#009999",
    selectedFill: "#FF0000", //redOnSelection
    lineWidth: 5,
    selected: false,
  };

  nodes.push(newNode);

  draw();
}
// code : addNewNodeButton END

// code : resetCanvasButton
const resetBtn = document.getElementById("resetCanvas");
resetBtn.addEventListener("click", clearCanvas);

function clearCanvas() {
  console.log("reset-fired");

  context.clearRect(0, 0, canvas.width, canvas.height);

  nodes.length = 0;
  edges.length = 0;

  nodes = [];
  edges = [];
}
// code : resetCanvasButton END

// code : nodeData
const nodesData = document.getElementById("nodesData");
nodesData.addEventListener("click", getNodesData);

function getNodesData() {
  console.log("Nodes data >>>");

  console.log(nodes);
}
// code : nodeData END

// code : edgesData
const edgesData = document.getElementById("edgesData");
edgesData.addEventListener("click", getEdgesData);
function getEdgesData() {
  console.log("Edges data >>>");

  console.log(edges);
}
// code : nodeData END

// code : deleteANode
const deleteNodeBtn = document.getElementById("deleteNode");
deleteNodeBtn.addEventListener("click", deleteNode);
function deleteNode() {
  if (selection && selection.selected) {
    // ifANodeHasBeenSelected

    let index = nodes.indexOf(selection);
    if (index > -1) {
      nodes.splice(index, 1);
    }
    // remove edges associated with node
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].from === selection || edges[i].to === selection) {
        edges.splice(i, 1);
        i--; // decrement index because we just removed an element
      }
    }

    // redrawTheNodesAndEdgesWithNewArrayCredentials
    draw();
    console.log("delete-success : node-deleted");
  } else {
    console.log("delete falied : no-node-selected");
  }
}
// code : deleteANode END

// checkIfEdgeIsClicked?
// The function calculates the mouse coordinates relative to the canvas by subtracting the canvas's top-left corner from the event's clientX and clientY properties. It then loops over each edge in the edges array and calculates the distance between the mouse coordinates and the start and end points of the edge. If the sum of these distances minus the length of the edge is less than 5 (i.e., the mouse is within 5 pixels of the edge), the function returns the edge. Otherwise, it returns null.
// function getClickedEdge(event) {
//   const canvasRect = event.target.getBoundingClientRect();
//   console.log(canvasRect);
//   const mouseX = event.clientX - canvasRect.left;
//   const mouseY = event.clientY - canvasRect.top;

//   for (const edge of edges) {
//     const distanceFromStart = distance(
//       mouseX,
//       mouseY,
//       edge.from.x,
//       edge.from.y
//     );

//     let edgeLength = distance(edge.from.x, edge.from.y, edge.to.x, edge.to.y);
//     const distanceFromEnd = distance(mouseX, mouseY, edge.to.x, edge.to.y);
//     const distanceAlongEdge = distanceFromStart + distanceFromEnd - edgeLength;

//     console.log(distanceAlongEdge);

//     if (distanceAlongEdge < 5) {
//       return edge;
//     }
//   }

//   return null;
// }

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// // functionToHighlightEdge
// function highlightEdge(edge, context, highlightColor, highlightWidth) {
//   edge.edgeSelected = true;
//   // Draw the edge again with a different color and width
//   context.beginPath();
//   context.moveTo(edge.from.x, edge.from.y);
//   context.lineTo(edge.to.x, edge.to.y);
//   context.strokeStyle = highlightColor;
//   context.lineWidth = highlightWidth;
//   context.stroke();

//   // Redraw any nodes that are connected to the highlighted edge
//   context.fillStyle = nodeColor;
//   for (const node of [edge.from, edge.to]) {
//     context.beginPath();
//     context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
//     context.fill();
//   }

//   draw();
// }

// code : deleteAnEdge
const deleteEdgeBtn = document.getElementById("deleteEdge");
deleteEdgeBtn.addEventListener("click", deleteEdge);
function deleteEdge() {
  if (selection && selection.edgeSelected) {
    // ifAEdgeHasBeenSelected

    let index = edges.indexOf(selection);
    if (index > -1) {
      edges.splice(index, 1);
    }

    // redrawTheNodesAndEdgesWithNewArrayCredentials
    draw();
    console.log("delete-success : edge-deleted");
  } else {
    console.log("delete-falied : no-edge-selected");
  }
}
// code : deleteAnEdge END
