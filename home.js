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

const YOUR_API_KEY = "d2bc00add5b05f62d8bb5bb5e7e6fdfb";
async function getRandomVerse() {
  try {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/verses?api-key=${YOUR_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    const allVerses = data.data; // Array of all verses

    // Promise-based random verse selection
    const randomIndexPromise = new Promise((resolve, reject) => {
      const randomIndex = Math.floor(Math.random() * allVerses.length);
      resolve(randomIndex);
    });

    return await randomIndexPromise.then((index) => {
      return {
        text: allVerses[index].text,
        reference: allVerses[index].reference,
      };
    });
  } catch (error) {
    console.error("Error fetching verse:", error);
  }
}

getRandomVerse()
  .then((verse) => {
    console.log(`Random verse: ${verse.text}`);
    console.log(`Reference: ${verse.reference}`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
