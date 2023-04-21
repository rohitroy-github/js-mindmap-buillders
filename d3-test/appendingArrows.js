// var parentSvg = Snap("#mainSVG");

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

// checked
