const previewFrame = document.querySelector("#pdf-preview");
const tabs = [...document.querySelectorAll(".viewer-tab")];
const previewButtons = [...document.querySelectorAll(".preview-button")];
const year = document.querySelector("#year");

function showDocument(file, title) {
  if (!previewFrame || !file) {
    return;
  }

  previewFrame.src = `${file}#toolbar=1&navpanes=0`;
  previewFrame.title = title || "Document preview";

  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.file === file);
  });

  document.querySelector("#cv")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showDocument(tab.dataset.file, tab.dataset.title);
  });
});

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showDocument(button.dataset.file, button.dataset.title);
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
