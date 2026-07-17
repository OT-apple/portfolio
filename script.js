/**
 * vCard portfolio — navigation, filters, 3D tilt, skills grid, typing, carousel
 */

const TYPED_ROLES = [
  "web developers",
  "SharePoint builders",
  "Python learners",
  "robotics makers",
  "cybersecurity explorers",
];

const SKILLS_TECH = [
  { name: "HTML", short: "HTML", color: "#e34f26", tag: "Web" },
  { name: "CSS", short: "CSS", color: "#1572b6", tag: "Web" },
  { name: "JavaScript", short: "JS", color: "#f7df1e", tag: "Web", dark: true },
  { name: "Bootstrap", short: "BS", color: "#7952b3", tag: "Web" },
  { name: "Python", short: "PY", color: "#3776ab", tag: "Code" },
  { name: "Flask", short: "FL", color: "#111111", tag: "Backend" },
  { name: "SharePoint", short: "SP", color: "#038387", tag: "Enterprise" },
  { name: "Git", short: "Git", color: "#f05032", tag: "Tools" },
  { name: "GitHub", short: "GH", color: "#6e5494", tag: "Tools" },
  { name: "MySQL", short: "SQL", color: "#4479a1", tag: "Database" },
  { name: "REST API", short: "API", color: "#00bcd4", tag: "Backend" },
  { name: "Linux", short: "LX", color: "#fcc624", tag: "OS", dark: true },
  { name: "Arduino", short: "AR", color: "#00979d", tag: "Hardware" },
  { name: "C / C++", short: "C++", color: "#00599c", tag: "Code" },
  { name: "Cybersecurity", short: "SEC", color: "#c62828", tag: "Security" },
  { name: "OWASP", short: "OW", color: "#333333", tag: "Security" },
];

const SKILLS_DESIGN = [
  { name: "Responsive UI", short: "UI", color: "#3b82f6", tag: "Design" },
  { name: "Wireframing", short: "WF", color: "#6366f1", tag: "Design" },
  { name: "Prototyping", short: "PR", color: "#8b5cf6", tag: "Design" },
  { name: "Figma", short: "FG", color: "#a259ff", tag: "Design" },
  { name: "Canva", short: "CV", color: "#00c4cc", tag: "Design" },
  { name: "3D Printing", short: "3D", color: "#ef4444", tag: "Maker" },
  { name: "Creative Arts", short: "ART", color: "#ec4899", tag: "Creative" },
  { name: "Color Theory", short: "CT", color: "#f59e0b", tag: "Design" },
  { name: "Layout Design", short: "LD", color: "#10b981", tag: "Design" },
  { name: "CAD Basics", short: "CAD", color: "#64748b", tag: "Maker" },
  { name: "Sensor UI", short: "SN", color: "#0ea5e9", tag: "Hardware" },
  { name: "DIY Prototypes", short: "DIY", color: "#84cc16", tag: "Maker" },
];

const TESTIMONIALS = [
  {
    initials: "RM",
    name: "Internship Mentor",
    text: "Sureshkumar showed strong dedication during the robotics internship. He quickly learned assembly, programming, and troubleshooting, and delivered practical DIY builds with care for quality.",
  },
  {
    initials: "AP",
    name: "Academic Peer",
    text: "Working with Sureshkumar on web projects was smooth. He builds clean, responsive interfaces and is always eager to refine the user experience.",
  },
  {
    initials: "ST",
    name: "SharePoint Colleague",
    text: "His SharePoint installation and design work was organized and effective. He understands collaboration needs and documents solutions clearly.",
  },
  {
    initials: "CS",
    name: "Cybersecurity Trainer",
    text: "Sureshkumar approaches security fundamentals seriously — secure coding habits, OWASP awareness, and a willingness to learn continuously.",
  },
];

/* Typing animation */
(function typingEffect() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = TYPED_ROLES[roleIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % TYPED_ROLES.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 90);
  }
  tick();
})();

/* Skills & Tools grids */
function renderSkills(container, list) {
  if (!container) return;
  container.innerHTML = list
    .map(
      (s) => `
    <li class="skill-tool-card card-3d" data-tilt>
      <div class="skill-tool-logo" style="background:${s.color};color:${s.dark ? "#111" : "#fff"}">${s.short}</div>
      <h4>${s.name}</h4>
      <span class="skill-tag">${s.tag}</span>
    </li>`
    )
    .join("");
}

renderSkills(document.getElementById("skills-grid"), SKILLS_TECH);
renderSkills(document.getElementById("skills-grid-design"), SKILLS_DESIGN);

document.querySelectorAll("[data-skills-tab]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.skillsTab;
    document.querySelectorAll("[data-skills-tab]").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    document.querySelectorAll("[data-skills-panel]").forEach((panel) => {
      panel.classList.toggle("is-hidden", panel.dataset.skillsPanel !== tab);
    });
    const panelId = tab === "design" ? "skills-grid-design" : "skills-grid";
    bindTilt(document.querySelectorAll(`#${panelId} [data-tilt]`));
  });
});

/* Sidebar */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn?.addEventListener("click", () => sidebar?.classList.toggle("active"));

/* Page navigation */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function navigateTo(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });
  navigationLinks.forEach((link) => {
    const isMatch =
      link.dataset.page === pageName ||
      link.textContent.trim().toLowerCase() === pageName;
    link.classList.toggle("active", isMatch);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page || link.textContent.trim().toLowerCase();
    navigateTo(page);
  });
});

/* Portfolio filter */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

function filterProjects(category) {
  filterItems.forEach((item) => {
    const match = category === "all" || item.dataset.category === category;
    item.classList.toggle("active", match);
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProjects(btn.dataset.filter);
  });
});

select?.addEventListener("click", () => select.classList.toggle("active"));

selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.dataset.filter;
    if (selectValue) selectValue.textContent = item.textContent;
    select?.classList.remove("active");
    filterBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.filter === value);
    });
    filterProjects(value);
  });
});

/* Image fallbacks */
const fallbacks = {
  about: "linear-gradient(135deg, hsl(210,30%,22%), hsl(230,35%,14%))",
  education: "linear-gradient(135deg, hsl(200,30%,22%), hsl(220,35%,14%))",
  internship: "linear-gradient(135deg, hsl(160,30%,20%), hsl(180,30%,14%))",
  experience: "linear-gradient(135deg, hsl(250,30%,22%), hsl(270,30%,14%))",
  project: "linear-gradient(135deg, hsl(30,35%,22%), hsl(40,35%,14%))",
  certificates: "linear-gradient(135deg, hsl(45,40%,22%), hsl(35,40%,14%))",
};

document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.background = fallbacks[this.dataset.fallback] || fallbacks.project;
    this.classList.add("fallback");
    this.removeAttribute("src");
    if (this.closest(".intro-photo")) {
      document.getElementById("intro-photo-fallback")?.classList.add("show");
    }
  });
});

const profileImg = document.getElementById("profile-img");
const avatarFallback = document.getElementById("avatar-fallback");
profileImg?.addEventListener("error", () => {
  profileImg.style.display = "none";
  avatarFallback?.classList.add("show");
});

/* 3D mouse tilt */
function bindTilt(nodes) {
  nodes.forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "1";
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

bindTilt(document.querySelectorAll("[data-tilt]"));

/* Testimonials 3D auto carousel */
(function initTestimonials() {
  const track = document.getElementById("testimonials-track");
  const dotsEl = document.getElementById("testimonials-dots");
  const wrap = document.getElementById("testimonials-carousel");
  if (!track || !wrap) return;

  const GAP = 300;
  const DEPTH = 120;
  const ROT = 38;
  let active = 0;
  let timer = null;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cards = TESTIMONIALS.map((t, i) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="testimonial-avatar">${t.initials}</div>
      <h4>${t.name}</h4>
      <p>${t.text}</p>
    `;
    card.addEventListener("click", () => goTo(i));
    track.appendChild(card);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Testimonial ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsEl?.appendChild(dot);

    return card;
  });

  function layout() {
    cards.forEach((card, i) => {
      const offset = i - active;
      const abs = Math.abs(offset);
      card.style.transform = `translateX(${offset * GAP}px) translateZ(${-abs * DEPTH}px) rotateY(${offset * -ROT}deg) scale(${Math.max(1 - abs * 0.1, 0.75)})`;
      card.style.opacity = String(abs > 2 ? 0 : 1 - abs * 0.25);
      card.style.zIndex = String(10 - abs);
      card.classList.toggle("active", offset === 0);
      card.style.pointerEvents = abs <= 1 ? "auto" : "none";
    });
    dotsEl?.querySelectorAll("button").forEach((d, i) => d.classList.toggle("on", i === active));
  }

  function goTo(i) {
    active = ((i % cards.length) + cards.length) % cards.length;
    layout();
    restart();
  }

  function next() {
    goTo(active + 1);
  }
  function prev() {
    goTo(active - 1);
  }

  wrap.querySelector("[data-carousel-prev]")?.addEventListener("click", prev);
  wrap.querySelector("[data-carousel-next]")?.addEventListener("click", next);

  let startX = 0;
  const stage = wrap.querySelector(".carousel-stage");
  stage?.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
  });
  stage?.addEventListener("pointerup", (e) => {
    const d = e.clientX - startX;
    if (Math.abs(d) > 40) (d > 0 ? prev : next)();
  });

  function restart() {
    clearInterval(timer);
    if (!reduced) timer = setInterval(next, 4500);
  }

  stage?.addEventListener("mouseenter", () => clearInterval(timer));
  stage?.addEventListener("mouseleave", restart);

  layout();
  restart();
})();

/* Contact form */
document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("form-note");
  if (note) note.hidden = false;
  e.target.reset();
  setTimeout(() => {
    if (note) note.hidden = true;
  }, 4000);
});
