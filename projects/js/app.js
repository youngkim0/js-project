/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let scrollPosition = 0;
let sectionPosition = [0, 0, 0];
let sectionCount = 3;
let sections = [];
const menuList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Search all sections and add them to an array(sections)
function SetSectionElements() {
  sections = [];
  for (let i = 1; i <= sectionCount; i++) {
    let section = document.getElementById(`section${i}`);

    sections.push(section);
  }
}
SetSectionElements();

function CreateMenu() {
  for (const section of sections) {
    menuList.innerHTML += `<li>${section.getAttribute("data-nav")}</li>`;
  }
}
CreateMenu();
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", (e) => {
  scrollPosition = window.scrollY;
  console.log(scrollPosition);
});

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
