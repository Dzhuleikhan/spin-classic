// Media query for detecting screen width less than 1100px
const screenWidthMediaQuery = window.matchMedia("(max-width: 1100px)");

// Function to check screen width and orientation
const checkScreenWidthAndOrientation = () => {
  if (screenWidthMediaQuery.matches) {
    // Screen width is less than 1100px, now check orientation
    const portrait = window.matchMedia("(orientation: portrait)").matches;

    if (portrait) {
      console.log("portrait");
    } else {
      console.log("landscape");
    }

    // Listen for orientation changes
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", (e) => {
        const portrait = e.matches;

        if (portrait) {
          console.log("portrait");
          document.querySelector(".landscape").classList.add("hidden");
        } else {
          console.log("landscape");
          document.querySelector(".landscape").classList.remove("hidden");
        }
      });
  }
};

// Call the function initially to set up checks
checkScreenWidthAndOrientation();

// // Listen for screen width changes
screenWidthMediaQuery.addEventListener("change", (e) => {
  if (e.matches) {
    // Screen width is now less than 1100px
    checkScreenWidthAndOrientation();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".preloader").style.opacity = 0;
    document.querySelector(".preloader").style.visibility = "hidden";
    document.querySelector(".wrapper").style.opacity = 1;
  }, 1000);
});
