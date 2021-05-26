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
let sectionPosition = [];
let sections;
let scrollPosition = 0;
let sectionCount = document.getElementsByClassName("landing__container").length;
let currentSection = 0;
let newCurrent;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Search all sections and add them to an array(sections)
function SetSectionElements() {
  sections = [];
  sectionCount = document.getElementsByClassName("landing__container").length;
  for (let i = 1; i <= sectionCount; i++) {
    let section = document.getElementById(`section${i}`);
    sections.push(section);
    sectionPosition.push(0);
  }
}

// Sets current section Y coordinates
function SetSectionPosition() {
  for (let i = 0; i < sectionCount; i++) {
    const bodyRect = document.body.getBoundingClientRect();
    const sectionRect = sections[i].getBoundingClientRect();
    sectionPosition[i] =
      sectionRect.top -
      bodyRect.top +
      parseFloat(
        window.getComputedStyle(
          document.getElementsByClassName("landing__container")[0]
        ).paddingTop
      );
    if (window.innerWidth < 560) {
      sectionPosition[i] += 80;
    } else {
      sectionPosition[i] += 160;
    }
  }
}

// Detects if the width of the window has changed and set the
// each section's Y to coordinate with it
window.addEventListener("resize", (e) => {
  for (let i = 0; i < sectionCount; i++) {
    const bodyRect = document.body.getBoundingClientRect();
    const sectionRect = sections[i].getBoundingClientRect();
    sectionPosition[i] =
      sectionRect.top -
      bodyRect.top +
      parseFloat(
        window.getComputedStyle(
          document.getElementsByClassName("landing__container")[0]
        ).paddingTop
      );
    if (window.innerWidth < 560) {
      sectionPosition[i] += 80;
    } else {
      sectionPosition[i] += 160;
    }
  }
});

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// Adds Sections to the Menu
function CreateMenuItems() {
  for (let i = 0; i < sectionCount; i++) {
    document.getElementById("navbar__list").innerHTML += `<a href="#section${
      i + 1
    }"<li>${sections[i].getAttribute("data-nav")}</li></a>`;
  }
}
// Changes the menu items to be visible to the color assigned
function ChangeMenuItemsColor(color) {
  document.getElementById("navbar__list").style.color = color;
}
// Add class 'active' to section when near top of viewport
function SetNewCurrentSection(newCurrent) {
  document
    .querySelector(".your-active-class")
    .classList.remove("your-active-class");
  document
    .querySelector(`#section${newCurrent}`)
    .classList.add("your-active-class");
  currentSection = newCurrent - 1;
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
SetSectionElements();
CreateMenuItems();
ChangeMenuItemsColor("black");
SetSectionPosition();
// Scroll to section on link click

// Set sections as active
window.addEventListener("scroll", (e) => {
  scrollPosition = window.scrollY;
  for (let i = 0; i < sectionCount; i++) {
    if (scrollPosition <= sectionPosition[i]) {
      newCurrent = i;
      break;
    }
  }
  if (newCurrent !== currentSection) {
    SetNewCurrentSection(newCurrent + 1);
  }
});
