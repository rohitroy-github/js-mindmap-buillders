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

    // console.log("selection", selection);
    // console.log("currentRect", currentRect);

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
