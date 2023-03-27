// Initialize variables
let canvas = document.getElementById("canvas");
let addNodeButton = document.getElementById("add-node");
let nodes = [];
let selectedNode = null;
let nodeCount = 0;

// Add event listeners
addNodeButton.addEventListener("click", addNode);
canvas.addEventListener("mousedown", selectNode);
canvas.addEventListener("mouseup", deselectNode);
canvas.addEventListener("mousemove", moveNode);

// Define functions
function addNode() {
  let node = document.createElement("div");
  node.className = "node";
  node.id = "node" + nodeCount;
  nodeCount++;
  canvas.appendChild(node);
  nodes.push(node);
  node.addEventListener("mousedown", selectNode);
}

function selectNode(e) {
  let id = e.target.id;
  if (id.startsWith("node")) {
    selectedNode = document.getElementById(id);
    selectedNode.style.border = "2px solid #ff0000";
  }
}

function deselectNode() {
  if (selectedNode) {
    selectedNode.style.border = "1px solid #ccc";
    selectedNode = null;
  }
}

function moveNode(e) {
  if (selectedNode) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    selectedNode.style.left = x + "px";
    selectedNode.style.top = y + "px";
  }
}

function deleteNode() {
  if (selectedNode) {
    canvas.removeChild(selectedNode);
    let index = nodes.indexOf(selectedNode);
    if (index > -1) {
      nodes.splice(index, 1);
    }
    selectedNode = null;
  }
}

// Add deleteNode function to window object for accessibility
window.deleteNode = deleteNode;
