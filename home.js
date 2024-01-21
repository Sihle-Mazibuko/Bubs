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

  const flowerSizePercentage = 60; // Adjust the percentage as needed
  const flowerSize = (sectionWidth * flowerSizePercentage) / 100;

  d3.select("svg").attr("width", flowerSize).attr("height", flowerSize);

  // Update the flower position to keep it centered
  d3.select("#flower-container").attr(
    "transform",
    `translate(${flowerSize / 2}, ${flowerSize / 2})`
  );
}

updateFlowerSize();
window.addEventListener("resize", updateFlowerSize);

const sectionWidth = d3
  .select("#flower-section")
  .node()
  .getBoundingClientRect().width;

const flowerSize = Math.min(sectionWidth, 1000); // Adjust the factor as needed

// Step 2: Create an SVG container inside the .flower-container div
const svg = d3
  .select(".flower-container")
  .append("svg")
  .attr("width", flowerSize) // Set the width of the SVG container
  .attr("height", flowerSize); // Set the height of the SVG container

svg
  .append("circle")
  .attr("cx", flowerSize / 2)
  .attr("cy", flowerSize * 0.3)
  .attr("r", flowerSize * 0.22)
  .style("fill", "yellow")
  .style("stroke-width", "3")
  .style("stroke", "#000");

svg
  .append("circle")
  .attr("cx", flowerSize / 2 - (flowerSize * 0.25) / 3.3)
  .attr("cy", flowerSize * 0.22)
  .attr("r", flowerSize * 0.04)
  .style("fill", "black")
  .style("stroke-width", "3");

svg
  .append("circle")
  .attr("cx", flowerSize / 2 - (flowerSize * 0.28) / 3.3)
  .attr("cy", flowerSize * 0.21)
  .attr("r", flowerSize * 0.02)
  .style("fill", "white");

svg
  .append("circle")
  .attr("cx", flowerSize / 2 + (flowerSize * 0.25) / 3.3)
  .attr("cy", flowerSize * 0.22)
  .attr("r", flowerSize * 0.04)
  .style("fill", "black")
  .style("stroke-width", "3");

svg
  .append("circle")
  .attr("cx", flowerSize / 2 + (flowerSize * 0.22) / 3.3)
  .attr("cy", flowerSize * 0.21)
  .attr("r", flowerSize * 0.02)
  .style("fill", "white");

const mouthPath = d3.path();
mouthPath.arc(
  flowerSize / 2,
  flowerSize * 0.32,
  flowerSize * 0.14,
  0,
  Math.PI,
  false
);

// Save the initial mouth path separately
const initialMouthPath = mouthPath.toString();

svg
  .append("path")
  .attr("d", initialMouthPath) // Use the initial mouth path during the creation
  .style("stroke", "black")
  .style("fill", "red")
  .style("stroke-width", "3");

const numberOfPetals = 28;
let randomColor1 = getRandomColor();
let randomColor2 = getRandomColor();

for (let i = 0; i < numberOfPetals; i++) {
  const angle = (i * 2 * Math.PI) / numberOfPetals;
  const petalPath = d3.path();

  petalPath.moveTo(flowerSize / 2 - flowerSize * 0.03, flowerSize * 0.02);
  petalPath.arc(
    flowerSize / 2,
    flowerSize * 0.02,
    flowerSize * 0.03,
    Math.PI,
    0,
    false
  );
  petalPath.lineTo(flowerSize / 2 + flowerSize * 0.03, flowerSize * 0.1);
  petalPath.lineTo(flowerSize / 2 - flowerSize * 0.03, flowerSize * 0.1);
  petalPath.closePath();

  const fillColor = i % 2 === 0 ? randomColor1 : randomColor2;

  svg
    .append("path")
    .attr("d", petalPath.toString())
    .attr(
      "transform",
      `rotate(${(i * 360) / numberOfPetals},${flowerSize / 2},${
        flowerSize * 0.309
      })`
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
