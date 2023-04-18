const colorInput = document.getElementById("color-input");
const colorSwatch = document.querySelector(".color-swatch");

console.log(colorInput.value);

colorInput.addEventListener("input", function () {
  console.log(colorInput.value);
});
