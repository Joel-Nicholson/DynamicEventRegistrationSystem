/* makes sure th info is correct from the registration form and saves the data it gets for ticket.html */

const form = document.getElementById("reg-form");
const avatarInput = document.getElementById("avatar");
const dropzone = document.querySelector(".dropzone");
const preview = document.getElementById("avatar-preview");
const dropzoneText = document.getElementById("dropzone-text");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB_PATTERN = /^@[A-Za-z0-9-]+$/;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE = 500 * 1024; // 500KB

/* Shows an error message under a field or so (empty string would clear it) */
function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
}

/* sends off an error message for the avatar file, or "" if it is valid */
function checkAvatar(file) {
    if (!file) return "Please upload an avatar photo.";
  if (!ALLOWED_TYPES.includes(file.type)) return "Invalid file type. Please upload a JPG or PNG.";
        if (file.size > MAX_SIZE) return "File too large. Please upload a photo under 500KB.";
  return "";
}

/* Shows a preview sneak peak  of the chosen file inside the drop zone area */
function showPreview(file) {
  if (checkAvatar(file)) return;
    preview.src = URL.createObjectURL(file);
preview.alt = "Preview of your avatar";
  dropzoneText.textContent = file.name;
}

avatarInput.addEventListener("change", () => {
   const file = avatarInput.files[0];
  setError("avatar", checkAvatar(file));
  showPreview(file);
});

/* actuall drag and drop system */
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
     dropzone.classList.add("dragover");
});
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("dragover");
  avatarInput.files = event.dataTransfer.files;
       avatarInput.dispatchEvent(new Event("change"));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
     const github = form.github.value.trim();
const file = avatarInput.files[0];

  const errors = {
    avatar: checkAvatar(file),
       name: name ? "" : "Full name is required.",
    email: EMAIL_PATTERN.test(email) ? "" : "Please enter a valid email address.",
    github: GITHUB_PATTERN.test(github) ? "" : "GitHub username must start with @ (e.g. @yourusername)."
  };

  /* dIsplay every error in proper place */
  Object.keys(errors).forEach((key) => setError(key, errors[key]));
  if (Object.values(errors).some(Boolean)) return;

  /* Convert the image to text so it can be actually stored, then go to the ticket */
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const ticket = {
        name,
      email,
         github,
      avatar: reader.result,
      serial: "#" + String(Math.floor(Math.random() * 100000)).padStart(5, "0")
    };
    localStorage.setItem("codingConfTicket", JSON.stringify(ticket));
    window.location.href = "ticket.html";
  });
  reader.readAsDataURL(file);
});
