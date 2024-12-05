import gsap from "gsap";
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

export function hidePreloader() {
  gsap.to(".preloader", { opacity: 0, duration: 0.5 });
  document.querySelector(".wrapper").classList.remove("hidden");
}