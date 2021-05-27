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
// Creates a new section by copying an existing section
function CreateNewSection() {
  const newSection = document.createElement("section");
  newSection.innerHTML = document.querySelector("#section1").innerHTML;
  newSection.toggleAttribute("id");
  newSection.setAttribute("id", `section${sectionCount + 1}`);
  newSection.toggleAttribute("data-nav");
  newSection.setAttribute("data-nav", `section ${sectionCount + 1}`);
  newSection.children[0].children[0].textContent = `Section ${
    sectionCount + 1
  }`;
  return newSection;
}

// Adds a section dynamically at the end
function AddSection(count) {
  const sectionCountBefore = sectionCount;
  for (let i = 0; i < count; i++) {
    document.querySelector("main").appendChild(CreateNewSection());
    SetSectionElements();
    CreateMenuItems(sectionCount - 1);
    SetSectionPosition();
    ScrollToLink();
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// Adds Sections to the Menu
function CreateMenuItems(n) {
  for (let i = n; i < sectionCount; i++) {
    document.getElementById(
      "navbar__list"
    ).innerHTML += `<li class="menuItem">${sections[i].getAttribute(
      "data-nav"
    )}</li>`;
  }
  document.getElementById("navbar__list").style.display = "flex";
  document.getElementById("navbar__list").style.justifyContent = "space-evenly";
  const menuItems = document.getElementsByClassName("menuItem");
  for (let i = n; i < sectionCount; i++) {
    menuItems[i].style.cursor = "pointer";
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
function ScrollToLink() {
  const elements = document.querySelectorAll(".menuItem");
  for (let i = 0; i < sectionCount; i++) {
    elements[i].addEventListener(
      "click",
      (e) => {
        console.log("clicked");
        scrollTo({
          left: 0,
          top: sectionPosition[i],
          behavior: "smooth",
        });
        e.preventDefault();
      },
      false
    );
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

SetSectionElements();
CreateMenuItems(0);
ChangeMenuItemsColor("blue");
SetSectionPosition();
ScrollToLink();
AddSection(3);
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
