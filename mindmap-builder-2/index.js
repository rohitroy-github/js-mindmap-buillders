// Initialize the canvas
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const addNodeBtn = document.getElementById("addNodeBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const addEdgeBtn = document.getElementById("addEdgeBtn");

// NodeClass
class Node {
  // constructor
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.width = 100;
    this.height = 50;
    this.isSelected = false;
  }

  //   drawRectangleFunction
  draw() {
    // Draw the rectangle
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fillStyle = this.isSelected ? "#999" : "#ccc";
    ctx.fill();
    ctx.closePath();

    // Draw the text
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x, this.y);
  }

  contains(x, y) {
    return (
      x > this.x - this.width / 2 &&
      x < this.x + this.width / 2 &&
      y > this.y - this.height / 2 &&
      y < this.y + this.height / 2
    );
  }
}
// EndOfNodeClass

// EdgeClass
class Edge {
  // constructor
  constructor(startNode, endNode) {
    this.startNode = startNode;
    this.endNode = endNode;
  }

  //   drawEdgeFunction
  draw() {
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(this.startNode.x, this.startNode.y);
    ctx.lineTo(this.endNode.x, this.endNode.y);
    ctx.stroke();
    ctx.closePath();
  }
}
// endOfEdgeClass

// Initialize the state
let nodes = [];
let edges = [];
let selectedNode = null;
let isDragging = false;

// addEventListeners
canvas.addEventListener("mousedown", function (event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  // Check if the mouse is on a node
  for (const node of nodes) {
    if (node.contains(mouseX, mouseY)) {
      selectedNode = node;
      isDragging = true;
      break;
    }
  }

  // Deselect the node if the mouse is not on it
  if (!selectedNode) {
    for (const node of nodes) {
      node.isSelected = false;
    }
  }
});

canvas.addEventListener("mouseup", function (event) {
  if (isDragging) {
    isDragging = false;
  } else {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    // Add a new node if the "Add Node" button is clicked
    if (event.target.id === "addNodeBtn") {
      const newNode = new Node(mouseX, mouseY, "New Node");
      nodes.push(newNode);
      newNode.draw();
    }

    // Delete the selected node if the "Delete Node" button is clicked
    if (event.target.id === "deleteNodeBtn" && selectedNode) {
      // Delete the edges connected to the node
      edges = edges.filter(
        (edge) =>
          edge.startNode !== selectedNode && edge.endNode !== selectedNode
      );
      // Delete the node
      nodes.splice(nodes.indexOf(selectedNode), 1);
      selectedNode = null;
    }

    // Select a node if the mouse is on it
    for (const node of nodes) {
      if (node.contains(mouseX, mouseY)) {
        selectedNode = node;
        selectedNode.isSelected = true;
      }
    }

    // Add an edge if the mouse is on two nodes
    if (selectedNode && event.target.tagName !== "BUTTON") {
      for (const node of nodes) {
        if (node !== selectedNode && node.contains(mouseX, mouseY)) {
          const newEdge = new Edge(selectedNode, node);
          edges.push(newEdge);
          break;
        }
      }
    }
  }
});

canvas.addEventListener("mousemove", function (event) {
  if (isDragging && selectedNode) {
    selectedNode.x = event.clientX - canvas.offsetLeft;
    selectedNode.y = event.clientY - canvas.offsetTop;
  }
});

// defineRenderFunction
function render() {
  //   console.log("rendering");

  // add event listeners to each button
  addNodeBtn.addEventListener("click", function () {
    const newNode = new Node(canvas.style.top(50), mouseY, "New Node");
    nodes.push(newNode);
    newNode.draw();
  });

  deleteNodeBtn.addEventListener("click", function () {
    // code to delete a node from the mindmap
  });

  addEdgeBtn.addEventListener("click", function () {
    // code to add a new edge between two nodes in the mindmap
  });

  // clearCanvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the edges
  for (const edge of edges) {
    edge.draw();
  }

  // Draw the nodes
  for (const node of nodes) {
    node.draw();
  }

  // Request the next frame
  requestAnimationFrame(render);
}

// startRendering
requestAnimationFrame(render);
