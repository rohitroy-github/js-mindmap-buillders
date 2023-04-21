// shapes

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

// arrows

// Function to append the selected shape onto the parent SVG canvas
function appendArrow(selectedArrow) {
  let arrow;
  switch (selectedArrow) {
    case "rightArrow":
      arrow = parentSvg.path(
        "M50 50 L66 50 L66 42 L82 58 L66 74 L66 66 L50 66 Z"
      );
      break;
    case "leftArrow":
      arrow = parentSvg.path(
        "M74 50 L58 50 L58 42 L42 58 L58 74 L58 66 L74 66 Z"
      );
      break;
    case "upArrow":
      arrow = parentSvg.path(
        "M50 66 L50 50 L42 50 L58 34 L74 50 L66 50 L66 66 L50 66 Z"
      );
      break;
    case "downArrow":
      arrow = parentSvg.path(
        "M50 50 L50 66 L42 66 L58 82 L74 66 L66 66 L66 50 L50 50 Z"
      );
      arrow.attr({x: 50, y: 50});
      break;

    case "boomerangArrow":
      arrow = parentSvg.path("M50 50 L70 70 L90 50 L85 45 L70 60 L55 45 Z");
      break;

    default:
      console.error("Invalid arrow selected");
  }

  let uniqueId = `${selectedArrow}-` + Date.now();
  arrow.attr({id: uniqueId});

  return arrow;
}

// Attach a click event listener to the append button
const appendArrowBtn = document.querySelector("#append-arrow");
appendArrowBtn.addEventListener("click", () => {
  const arrowSelectionList = document.querySelector("#arrow-selection");
  const selectedArrow = arrowSelectionList.value;
  const arrow = appendArrow(selectedArrow);

  arrow.attr({
    fill: "#fff", // set fill color to white
    stroke: "#000", // set stroke color to black
    "stroke-width": 3, // set stroke width to 3
    transform: "translate(50, 50) scale(1.5)", // move arrow to (50, 50)
  });

  parentSvg.append(arrow);
});
