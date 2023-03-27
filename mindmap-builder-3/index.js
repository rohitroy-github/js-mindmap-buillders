// Initialize canvas
const canvas = d3.select("#mainCanvas");
const ctx = canvas.node().getContext("2d");
canvas.attr("width", 800).attr("height", 600);

let counter = 0;

// Initialize nodes array
const nodes = [];

// Add button click event listener
d3.select("#addNode").on("click", addNode);

// Define addNode function
function addNode() {
  const x = Math.floor(Math.random() * 700) + 50; // Random x position between 50 and 750
  const y = Math.floor(Math.random() * 500) + 50; // Random y position between 50 and 550
  const width = 100;
  const height = 50;
  const text = "New Node";
  const id = "node" + `${counter}`; // Unique id based on current time

  // Draw rectangle
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();

  // Add text
  ctx.fillText(text, x + 10, y + 30);

  // Add node to array
  nodes.push({
    id,
    x,
    y,
    width,
    height,
    text,
  });

  // Add drag and click event listeners to new node
  d3.select(`#${id}`)
    .call(
      d3.drag().on("drag", function (event) {
        const node = nodes.find((n) => n.id === id);
        node.x = event.x;
        node.y = event.y;
        redraw();
      })
    )
    .on("click", function () {
      selectNode(id);
    });

  counter++;
}

// Define redraw function to redraw all nodes on canvas
function redraw() {
  ctx.clearRect(0, 0, canvas.attr("width"), canvas.attr("height"));
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.rect(node.x, node.y, node.width, node.height);
    ctx.stroke();
    ctx.fillText(node.text, node.x + 10, node.y + 30);
  });
}

// Define selectNode function to select a node by id
function selectNode(id) {
  console.log(id);
  nodes.forEach((node) => {
    if (node.id === id) {
      // Highlight selected node
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      ctx.strokeRect(node.x, node.y, node.width, node.height);
    } else {
      // Unhighlight other nodes
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(node.x, node.y, node.width, node.height);
    }
  });
}
// Call redraw function initially to draw nodes on canvas
redraw();
