// Get reference to the parent SVG canvas element
let parentSvg = Snap("#mainSVG");

// Function to append the selected shape onto the parent SVG canvas
function appendShape(selectedShape) {
  let shape;
  switch (selectedShape) {
    case "circle":
      shape = parentSvg.circle(50, 50, 30);
      break;
    case "rectangle":
      shape = parentSvg.rect(20, 20, 100, 50);
      break;
    case "ellipse":
      shape = parentSvg.ellipse(75, 50, 50, 30);
      break;
    case "line":
      shape = parentSvg.line(0, 0, 100, 100);
      break;
    case "quad":
      shape = parentSvg.polygon("50,5 95,50 50,95 5,50");
      break;
    case "pentagon":
      shape = parentSvg.polygon("50,0 95,36 77,90 23,90 5,36");
      break;
    case "hexagon":
      shape = parentSvg.polygon("50,0 90,26 90,76 50,102 10,76 10,26");
      break;
    case "heptagon":
      shape = parentSvg.polygon("50,10 80,20 90,50 65,75 35,75 10,50 20,20");
      break;
    case "octagon":
      shape = parentSvg.polygon(
        "50,5 77,19 93,50 77,81 50,95 23,81 7,50 23,19"
      );
      break;

    default:
      console.error("Invalid shape selected");
  }

  let uniqueId = `${selectedShape}-` + Date.now();
  shape.attr({id: uniqueId});

  return shape;
}

// Attach a click event listener to the append button
const appendButton = document.querySelector("#append-button");
appendButton.addEventListener("click", () => {
  const shapeSelectionList = document.querySelector("#shape-selection");
  const selectedShape = shapeSelectionList.value;
  const shape = appendShape(selectedShape);
  // Optionally, you can add some styles to the shape element
  shape.attr({
    fill: "white",
    stroke: "black",
    strokeWidth: 3,
  });
});

// checked
