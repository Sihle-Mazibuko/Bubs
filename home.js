document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  const navList = document.querySelector(".nav-list");

  menuIcon.addEventListener("click", function () {
    navList.classList.toggle("show");
  });

  navList.addEventListener("click", function () {
    navList.classList.remove("show");
  });
});

function updateFlowerSize() {
  const sectionWidth = d3
    .select("#flower-section")
    .node()
    .getBoundingClientRect().width;
  const flowerSize = Math.min(sectionWidth * 0.8, 400); // Adjust the factor as needed

  // Select the existing SVG and update its width
  d3.select("svg")
    .attr("width", flowerSize)
    .attr("height", flowerSize * 4);
}

// Initial flower setup
updateFlowerSize();

// Event listener for window resize
window.addEventListener("resize", updateFlowerSize);

// Step 1: Get the width of the section
const sectionWidth = d3
  .select("#flower-section")
  .node()
  .getBoundingClientRect().width;

// Calculate the flower size based on the section width
const flowerSize = Math.min(sectionWidth * 0.8, 400); // Adjust the factor as needed

// Step 2: Create an SVG container inside the .flower-container div
const svg = d3
  .select(".flower-container")
  .append("svg")
  .attr("width", flowerSize) // Set the width of the SVG container
  .attr("height", 800); // Set the height of the SVG container

svg
  .append("circle")
  .attr("cx", sectionWidth / 2)
  .attr("cy", 180)
  .attr("r", 100)
  .style("fill", "yellow")
  .style("stroke-width", "3")
  .style("stroke", "#000");

svg
  .append("circle")
  .attr("cx", sectionWidth / 2 - 35)
  .attr("cy", 130)
  .attr("r", 20)
  .style("fill", "black")
  .style("stroke-width", "3");

svg
  .append("circle")
  .attr("cx", sectionWidth / 2 - 35)
  .attr("cy", 125)
  .attr("r", 8)
  .style("fill", "white");

svg
  .append("circle")
  .attr("cx", sectionWidth / 2 + 35)
  .attr("cy", 130)
  .attr("r", 20)
  .style("fill", "black")
  .style("stroke-width", "3");

svg
  .append("circle")
  .attr("cx", sectionWidth / 2 + 35)
  .attr("cy", 125)
  .attr("r", 8)
  .style("fill", "white");

const mouthPath = d3.path();
mouthPath.arc(sectionWidth / 2, 160, 70, 0, Math.PI, false);

// Save the initial mouth path separately
const initialMouthPath = mouthPath.toString();

svg
  .append("path")
  .attr("d", initialMouthPath) // Use the initial mouth path during the creation
  .style("stroke", "black")
  .style("fill", "red")
  .style("stroke-width", "3");

const numberOfPetals = 18;
let randomColor1 = getRandomColor();
let randomColor2 = getRandomColor();

for (let i = 0; i < numberOfPetals; i++) {
  const angle = (i * 2 * Math.PI) / numberOfPetals;
  const petalPath = d3.path();

  petalPath.moveTo(sectionWidth / 2 - 30, 20);
  petalPath.arc(sectionWidth / 2, 20, 30, Math.PI, 0, false);
  petalPath.lineTo(sectionWidth / 2 + 20, 80);
  petalPath.lineTo(sectionWidth / 2 - 20, 80);
  petalPath.closePath();

  const fillColor = i % 2 === 0 ? randomColor1 : randomColor2;

  svg
    .append("path")
    .attr("d", petalPath.toString())
    .attr(
      "transform",
      `rotate(${(i * 360) / numberOfPetals},${sectionWidth / 2},${180})`
    )
    .style("fill", fillColor)
    .style("stroke", "black")
    .style("stroke-width", 2);
}

svg.on("click", function () {
  randomColor1 = getRandomColor();
  randomColor2 = getRandomColor();

  svg.selectAll("path").each(function (d, i) {
    const fillColor = i % 2 === 0 ? randomColor1 : randomColor2;
    d3.select(this).style("fill", fillColor);
  });

  // Reset the mouth path to the initial state
  svg.select("path").attr("d", mouthPath.toString());
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
