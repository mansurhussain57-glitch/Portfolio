// Edit profile links and placeholders here. Replace each empty URL when ready.
const PORTFOLIO_CONFIG = {
  links: {
    linkedin: "",
    github: "",
    tryhackme: "",
    hackthebox: "",
    paper: "",
    webLab: "",
    forensicsLab: "",
    ctf: ""
  },
  email: "mansurhussain57@gmail.com",
  roles: ["Cyber Security Student", "Penetration Testing Enthusiast", "Digital Forensics Learner"]
};

const roleElement = document.getElementById("typed-role");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (roleElement && !reduceMotion) {
  let roleIndex = 0;
  let characterIndex = PORTFOLIO_CONFIG.roles[0].length;
  let deleting = true;
  const typeNextRole = () => {
    const role = PORTFOLIO_CONFIG.roles[roleIndex];
    roleElement.textContent = role.slice(0, characterIndex);
    if (!deleting && characterIndex < role.length) {
      characterIndex += 1;
      window.setTimeout(typeNextRole, 55);
    } else if (!deleting) {
      deleting = true;
      window.setTimeout(typeNextRole, 1500);
    } else if (characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(typeNextRole, 28);
    } else {
      roleIndex = (roleIndex + 1) % PORTFOLIO_CONFIG.roles.length;
      roleElement.setAttribute("aria-label", PORTFOLIO_CONFIG.roles[roleIndex]);
      deleting = false;
      window.setTimeout(typeNextRole, 220);
    }
  };
  window.setTimeout(typeNextRole, 1800);
} else if (roleElement) {
  roleElement.textContent = PORTFOLIO_CONFIG.roles[0];
}

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";

function updateThemeButton() {
  if (!themeToggle || !themeIcon) return;
  const isLight = document.documentElement.dataset.theme === "light";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  themeIcon.innerHTML = isLight
    ? '<path d="M20.2 15.5A8.5 8.5 0 0 1 8.5 3.8 8.5 8.5 0 1 0 20.2 15.5Z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
}

updateThemeButton();
themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  if (nextTheme === "dark") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});
navLinks?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll(".placeholder-link").forEach((link) => {
  const url = PORTFOLIO_CONFIG.links[link.dataset.link];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Add a destination URL in the PORTFOLIO_CONFIG.links block at the top of script.js.");
    });
  }
});

document.getElementById("resume-button")?.addEventListener("click", () => window.print());
document.getElementById("contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Portfolio enquiry from ${form.get("name")}`;
  const body = `${form.get("message")}\n\nFrom: ${form.get("name")} (${form.get("email")})`;
  window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
