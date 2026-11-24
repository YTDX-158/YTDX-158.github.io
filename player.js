const dialog = document.querySelector(".screening");
const video = dialog.querySelector("video");
const title = dialog.querySelector("h2");
const errorMessage = dialog.querySelector(".screening-error");
const directLink = errorMessage.querySelector("a");

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-film]");
  if (!link || !dialog.showModal || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

  event.preventDefault();
  title.textContent = link.dataset.title;
  dialog.classList.toggle("is-portrait", link.hasAttribute("data-portrait"));
  errorMessage.hidden = true;
  directLink.href = link.dataset.film;
  video.poster = link.dataset.poster;
  video.src = link.dataset.film;
  dialog.showModal();
  video.play().catch(() => {
    if (dialog.open && video.error) errorMessage.hidden = false;
  });
});

video.addEventListener("error", () => {
  if (dialog.open) errorMessage.hidden = false;
});

dialog.addEventListener("close", () => {
  video.pause();
  video.removeAttribute("src");
  video.removeAttribute("poster");
  video.load();
});
