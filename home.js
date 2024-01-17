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
// Function to fetch Bible verse data
async function fetchBibleVerse() {
  // API endpoint for a random Bible verse
  const apiUrl =
    "https://api.scripture.api.bible/v1/bibles/64ce9c1f-0524-4ddc-89d0-3b6b7f2c32f2/verses/GEN.1.1";

  try {
    // Fetch data from the API using your key
    const response = await fetch(apiUrl, {
      headers: {
        "api-key": "d2bc00add5b05f62d8bb5bb5e7e6fdfb", // Replace with your actual API key
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Bible verse. Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Display API data in the console
    console.log("Bible Verse:", data);

    // You can return the data or perform additional actions here
    return data;
  } catch (error) {
    console.error("Error fetching Bible verse:", error.message);
  }
}

// Call the function to fetch the Bible verse data
fetchBibleVerse();
