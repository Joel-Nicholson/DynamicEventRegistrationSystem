/* this gonna fill the ticket.html with the data saved from validation.js */

const saved = localStorage.getItem("codingConfTicket");

/* No data would mean the visitor skip out the form, so send them to the home */
if (!saved) {
  window.location.replace("index.html");
} else {
  const ticket = JSON.parse(saved);

  document.getElementById("t-name-heading").textContent = ticket.name;
  document.getElementById("t-name").textContent = ticket.name;
   document.getElementById("t-email").textContent = ticket.email;
  document.getElementById("t-serial").textContent = ticket.serial; document.getElementById("t-avatar").src = ticket.avatar;

  const githubLink = document.getElementById("t-github");
  githubLink.textContent = ticket.github;
  githubLink.href = "https://github.com/" + ticket.github.slice(1);
}
