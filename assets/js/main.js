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

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const openToggle = projectToggles.find(
    (toggle) => toggle.getAttribute("aria-expanded") === "true"
  );

  if (openToggle) {
    collapseProject(openToggle);
    openToggle.focus();
  }
});
