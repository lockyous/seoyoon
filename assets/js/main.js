const projectToggles = Array.from(document.querySelectorAll(".project-toggle"));

function collapseProject(toggle) {
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector(".project-action").textContent = "View";
  panel.hidden = true;
}

function expandProject(toggle) {
  projectToggles.forEach((otherToggle) => {
    if (otherToggle !== toggle) collapseProject(otherToggle);
  });

  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  toggle.setAttribute("aria-expanded", "true");
  toggle.querySelector(".project-action").textContent = "Close";
  panel.hidden = false;
}

projectToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      collapseProject(toggle);
    } else {
      expandProject(toggle);
    }
  });
});

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const galleryImages = Array.from(document.querySelectorAll(".project-gallery img"));
let lightboxTrigger = null;

function openLightbox(image) {
  lightboxTrigger = image;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  document.body.classList.add("lightbox-open");
  lightbox.showModal();
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.close();
}

galleryImages.forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Enlarge image: ${image.alt}`);
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  if (lightboxTrigger) lightboxTrigger.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (lightbox.open) return;

  const openToggle = projectToggles.find(
    (toggle) => toggle.getAttribute("aria-expanded") === "true"
  );

  if (openToggle) {
    collapseProject(openToggle);
    openToggle.focus();
  }
});
