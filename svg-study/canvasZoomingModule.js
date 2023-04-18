const svg = document.getElementById("mainSVG");
const leftCanvasBar = document.getElementById("leftCanvasBar");
const leftCanvasBarWidth = leftCanvasBar.clientWidth;
const leftCanvasBarHeight = leftCanvasBar.clientHeight;

svg.setAttribute("viewBox", `0 0 ${leftCanvasBarWidth} ${leftCanvasBarHeight}`);

let percentage = 100;
document.getElementById("zoomPercentage").innerHTML = `${percentage}%`;

let viewBox = svg.viewBox.baseVal;
const zoomFactor = 1.1; // How much to zoom in or out on each click or mousewheel movement

// Zoom in on button click
document.getElementById("zoomInBtn").addEventListener("click", function () {
  if (percentage < 175) {
    viewBox.width /= zoomFactor;
    viewBox.height /= zoomFactor;
    svg.setAttribute(
      "viewBox",
      `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    );
    percentage += 5;
    document.getElementById("zoomPercentage").innerHTML = `${percentage}%`;
    console.log("zooming-in", percentage);
  }
});

// Zoom out on button click
document.getElementById("zoomOutBtn").addEventListener("click", function () {
  if (percentage > 25) {
    viewBox.width *= zoomFactor;
    viewBox.height *= zoomFactor;
    svg.setAttribute(
      "viewBox",
      `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    );
    percentage -= 5;
    document.getElementById("zoomPercentage").innerHTML = `${percentage}%`;
    console.log("zooming-out", percentage);
  }
});

// Zoom in or out on mousewheel movement
svg.addEventListener("wheel", function (event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    if (percentage < 175) {
      viewBox.width /= zoomFactor;
      viewBox.height /= zoomFactor;
      percentage += 5;
      document.getElementById("zoomPercentage").innerHTML = `${percentage}%`;
      console.log("zooming-in", percentage);
    }
  } else {
    if (percentage > 25) {
      viewBox.width *= zoomFactor;
      viewBox.height *= zoomFactor;
      percentage -= 5;
      document.getElementById("zoomPercentage").innerHTML = `${percentage}%`;
      console.log("zooming-out", percentage);
    }
  }
  svg.setAttribute(
    "viewBox",
    `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
  );
});

document.getElementById("drawRectBtn").addEventListener("click", function () {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "100");
  rect.setAttribute("y", "100");
  rect.setAttribute("width", "100");
  rect.setAttribute("height", "100");
  rect.setAttribute("fill", "blue");
  svg.appendChild(rect);
});

// alsoPercentage

// const svg = document.getElementById("mainSVG");

// const leftCanvasBar = document.getElementById("leftCanvasBar");
// const leftCanvasBarWidth = leftCanvasBar.clientWidth;
// const leftCanvasBarHeight = leftCanvasBar.clientHeight;

// svg.setAttribute("viewBox", `0 0 ${leftCanvasBarWidth} ${leftCanvasBarHeight}`);

// let viewBox = svg.viewBox.baseVal;
// let zoomPercentage = 20; // Default zoom percentage
// let zoomFactor = 1 + zoomPercentage / 100; // Calculate zoom factor based on zoom percentage

// // Zoom in on button click
// document.getElementById("zoomInBtn").addEventListener("click", function () {
//   viewBox.width /= zoomFactor;
//   viewBox.height /= zoomFactor;
//   svg.setAttribute(
//     "viewBox",
//     `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
//   );
//   console.log(`Zooming in by ${zoomPercentage}%`);
// });

// // Zoom out on button click
// document.getElementById("zoomOutBtn").addEventListener("click", function () {
//   viewBox.width *= zoomFactor;
//   viewBox.height *= zoomFactor;
//   svg.setAttribute(
//     "viewBox",
//     `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
//   );
//   console.log(`Zooming out by ${zoomPercentage}%`);
// });

// // Zoom in or out on mousewheel movement
// svg.addEventListener("wheel", function (event) {
//   event.preventDefault();
//   if (event.deltaY < 0) {
//     viewBox.width /= zoomFactor;
//     viewBox.height /= zoomFactor;
//     console.log(`Zooming in by ${zoomPercentage}%`);
//   } else {
//     viewBox.width *= zoomFactor;
//     viewBox.height *= zoomFactor;
//     console.log(`Zooming out by ${zoomPercentage}%`);
//   }
//   svg.setAttribute(
//     "viewBox",
//     `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
//   );
// });

// // Update zoom percentage based on user input
// document
//   .getElementById("zoomPercentageInput")
//   .addEventListener("change", function () {
//     zoomPercentage = parseInt(this.value);
//     zoomFactor = 1 + zoomPercentage / 100;
//   });

// document.getElementById("drawRectBtn").addEventListener("click", function () {
//   const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//   rect.setAttribute("x", "100");
//   rect.setAttribute("y", "100");
//   rect.setAttribute("width", "100");
//   rect.setAttribute("height", "100");
//   rect.setAttribute("fill", "blue");
//   svg.appendChild(rect);
// });
