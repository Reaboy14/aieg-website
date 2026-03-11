/* =========================================
AIEG WEBSITE JAVASCRIPT
========================================= */

/* MOBILE HAMBURGER MENU */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("active");
hamburger.classList.toggle("active");
});

}


/* =========================================
ACCORDION (COURSES PAGE)
========================================= */

const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach(button => {

button.addEventListener("click", () => {

const content = button.nextElementSibling;

/* Close other accordions */

accordions.forEach(otherButton => {

if(otherButton !== button){

otherButton.classList.remove("active");

const otherContent = otherButton.nextElementSibling;

if(otherContent){
otherContent.style.maxHeight = null;
}

}

});

/* Toggle current accordion */

button.classList.toggle("active");

if(content.style.maxHeight){
content.style.maxHeight = null;
}else{
content.style.maxHeight = content.scrollHeight + "px";
}

});

});