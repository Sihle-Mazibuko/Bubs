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

// ... (Your existing code for fetchRandomDog and other logic)

// Attach the function to the button click event
document
  .getElementById("fetch-dog-btn")
  .addEventListener("click", fetchRandomDog);

// Function to fetch a random dog and update heading
function fetchRandomDog() {
  var httpLink = new XMLHttpRequest();
  httpLink.open("get", "https://dog.ceo/api/breeds/image/random");
  httpLink.send();

  httpLink.onreadystatechange = function () {
    if (httpLink.readyState == 4 && httpLink.status == 200) {
      var response = httpLink.responseText;
      try {
        var data = JSON.parse(response);
        if (data.status === "success") {
          var dogBreed = extractBreed(data.message);
          updateHeading(dogBreed);
          document.getElementById("dog-pic").src = data.message;
        } else {
          console.error("Failed to fetch dog data.");
        }
      } catch (error) {
        console.error("Error parsing JSON response.", error);
      }
    }
  };
}

// Function to update the heading with the dog breed name
function updateHeading(breedName) {
  document.getElementById("dog-breed-heading").textContent = breedName;
}

// Function to extract the breed from the image URL
function extractBreed(imageUrl) {
  var parts = imageUrl.split("/");
  var breedIndex = parts.indexOf("breeds") + 1;
  if (breedIndex < parts.length) {
    return capitalizeFirstLetter(parts[breedIndex]);
  } else {
    return "Unknown Breed";
  }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleFetchError(errorMessage) {
  console.error(errorMessage);
}

fetchRandomDog();
document
  .getElementById("fetch-dog-btn")
  .addEventListener("click", fetchRandomDog);

// fetchVerse.js file
document.addEventListener("DOMContentLoaded", fetchVerseOfTheDay);

async function fetchVerseOfTheDay() {
  try {
    const response = await fetch(
      "https://beta.ourmanna.com/api/v1/get/?format=json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);

    displayVerseOfTheDay(data.verse.details);
  } catch (error) {
    console.error("Error fetching verse data:", error.message);
  }
}

function displayVerseOfTheDay(verseDetails) {
  const verseContainer = document.getElementById("verse-container");
  const verseName = document.querySelector(".verse-name-placeholder");

  // Update the content of the verse container with the fetched verse
  verseContainer.textContent = verseDetails.text;
  verseName.textContent = `${verseDetails.reference} - (${verseDetails.version})`;
}

// Array of coffee IDs to filter out
const excludedCoffeeIds = [19, 20, 18];

document.addEventListener("DOMContentLoaded", fetchDailyRandomCoffee);

async function fetchDailyRandomCoffee() {
  try {
    // Retrieve stored coffee information and last fetch date
    const storedCoffeeInfo =
      JSON.parse(localStorage.getItem("dailyCoffeeInfo")) || {};
    const storedDate = storedCoffeeInfo.date;

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Check if the stored date matches the current date
    if (storedDate === currentDate && storedCoffeeInfo.coffees.length > 0) {
      // If dates match and there are remaining coffees, pop the next one
      const remainingCoffees = storedCoffeeInfo.coffees.filter(
        (coffee) => !excludedCoffeeIds.includes(coffee.id)
      ); // Filter out excluded coffees
      if (remainingCoffees.length > 0) {
        const randomCoffee = remainingCoffees.pop();
        localStorage.setItem(
          "dailyCoffeeInfo",
          JSON.stringify({ date: currentDate, coffees: remainingCoffees })
        );
        displayCoffeeInfo(randomCoffee);
      } else {
        // Handle the case where all coffees have been filtered out
        console.error("No more eligible coffees remaining.");
      }
    } else {
      // If dates don't match or no remaining coffees, fetch new coffees
      const response = await fetch("https://api.sampleapis.com/coffee/hot");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Coffee API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        // Filter out excluded coffees
        const filteredCoffees = data.filter(
          (coffee) => !excludedCoffeeIds.includes(coffee.id)
        );
        // Shuffle the array of coffees
        const shuffledCoffees = shuffleArray(filteredCoffees);
        const randomCoffee = shuffledCoffees.pop();

        // Store the shuffled array and update the date
        localStorage.setItem(
          "dailyCoffeeInfo",
          JSON.stringify({ date: currentDate, coffees: shuffledCoffees })
        );

        // Display the new coffee information in the HTML
        displayCoffeeInfo(randomCoffee);
      } else {
        console.error(
          "Invalid or empty API response. Unable to display coffee information."
        );
      }
    }
  } catch (error) {
    console.error("Error fetching coffee data:", error.message);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayCoffeeInfo(coffee) {
  const coffeeInfoSection = document.getElementById("coffee-info-section");

  // Clear previous content
  coffeeInfoSection.innerHTML = "";

  // Display coffee information in the HTML
  const coffeeHeading = document.createElement("h2");
  coffeeHeading.textContent = "Beverage of the Day";
  coffeeInfoSection.appendChild(coffeeHeading);

  const coffeeImage = document.createElement("img");
  coffeeImage.src = coffee.image;
  coffeeImage.alt = coffee.title;
  coffeeInfoSection.appendChild(coffeeImage);

  const coffeeTitle = document.createElement("p");
  coffeeTitle.textContent = `Today's drink: ${coffee.title}`;
  coffeeInfoSection.appendChild(coffeeTitle);
}
