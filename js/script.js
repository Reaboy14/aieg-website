/* =========================================
   AIEG WEBSITE JAVASCRIPT
   ========================================= */

/* =========================
   NAVIGATION (HAMBURGER)
   ========================= */

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.setAttribute("aria-controls", "navLinks");
  hamburger.setAttribute("aria-expanded", "false");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking any nav link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* Mark active nav link based on current page */
(function markActiveLink() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
})();


/* =========================
   ACCORDION (COURSES PAGE)
   ========================= */

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(button => {
  button.setAttribute("aria-expanded", "false");
  const content = button.nextElementSibling;
  if (content) {
    const id = "acc-" + Math.random().toString(36).slice(2, 8);
    content.id = id;
    button.setAttribute("aria-controls", id);
  }

  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // Close all others
    accordionHeaders.forEach(other => {
      if (other !== button) {
        other.classList.remove("active");
        other.setAttribute("aria-expanded", "false");
        const otherContent = other.nextElementSibling;
        if (otherContent) otherContent.style.maxHeight = null;
      }
    });

    // Toggle current
    const isOpen = button.classList.toggle("active");
    button.setAttribute("aria-expanded", String(isOpen));
    if (content) {
      content.style.maxHeight = isOpen ? content.scrollHeight + "px" : null;
    }
  });
});


/* =========================
   READ MORE TOGGLE
   ========================= */

document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", function () {
    const bio = this.previousElementSibling;
    const expanded = bio.classList.toggle("expanded");
    this.textContent = expanded ? "Read Less" : "Read More";
    this.setAttribute("aria-expanded", String(expanded));
  });
});


/* =========================
   FILTER RESOURCES
   ========================= */

function filterResources(type) {
  const items = document.querySelectorAll(".resource-item");
  items.forEach(item => {
    item.style.display = (type === "all" || item.classList.contains(type)) ? "flex" : "none";
  });

  // Update active tab styling
  document.querySelectorAll(".resource-tabs button").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter") === type);
  });
}

window.filterResources = filterResources;

/* Attach data-filter to resource tab buttons if present */
document.querySelectorAll(".resource-tabs button").forEach(btn => {
  const onclick = btn.getAttribute("onclick") || "";
  const match = onclick.match(/filterResources\(['"](\w+)['"]\)/);
  if (match) btn.setAttribute("data-filter", match[1]);
});


/* =========================
   COURSE MODAL
   ========================= */

(function initCourseModal() {
  const modal = document.getElementById("courseModal");
  if (!modal) return;

  const modalContent = document.getElementById("modalContent");
  const closeBtn = modal.querySelector(".close-modal");
  const modalBox = modal.querySelector(".modal-box");

  function openModal(contentHTML) {
    modalContent.innerHTML = contentHTML;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Override accordion behaviour on courses page to use modal
  document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      if (content) openModal(content.innerHTML);
    });
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (!modalBox.contains(e.target)) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
})();


/* =========================
   CONTACT FORM (basic UX)
   ========================= */

(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    if (msg) {
      msg.textContent = "Thank you — your message has been sent!";
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 5000);
    }
    form.reset();
  });
})();
