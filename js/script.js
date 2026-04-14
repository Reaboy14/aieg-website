/* =========================================
AIEG WEBSITE JAVASCRIPT (CLEAN VERSION)
========================================= */

/* =========================
NAVIGATION (HAMBURGER MENU)
========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}


/* =========================
ACCORDION (COURSES PAGE)
========================= */

const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // Close others
    accordions.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.classList.remove("active");
        const otherContent = otherButton.nextElementSibling;
        if (otherContent) otherContent.style.maxHeight = null;
      }
    });

    // Toggle current
    button.classList.toggle("active");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});


/* =========================
READ MORE TOGGLE
========================= */

document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", function () {
    const bio = this.previousElementSibling;

    bio.classList.toggle("expanded");

    this.textContent = bio.classList.contains("expanded")
      ? "Read Less"
      : "Read More";
  });
});


/* =========================
SMOOTH SCROLL (SEGMENTS)
========================= */

document.querySelectorAll(".segment").forEach(segment => {
  segment.addEventListener("click", function () {
    const target = this.getAttribute("data-target");
    const section = document.getElementById(target);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =========================
FILTER RESOURCES
========================= */

function filterResources(type) {
  const items = document.querySelectorAll(".resource-item");

  items.forEach(item => {
    if (type === "all" || item.classList.contains(type)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Make function global (so HTML onclick can access it)
window.filterResources = filterResources;