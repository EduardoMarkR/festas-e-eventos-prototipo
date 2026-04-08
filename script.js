const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const revealElements = document.querySelectorAll(".reveal");

// HEADER SCROLL
function handleHeaderScroll() {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();

// MENU MOBILE
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// ANIMAÇÃO REVEAL
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  revealElements.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// FORMULÁRIO
const form = document.getElementById("form-contato");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const mensagem = document.getElementById("mensagem")?.value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    form.reset();
  });
}

// BLOG SEARCH + FILTER + TAGS
const blogSearch = document.getElementById("blogSearch");
const blogFilter = document.getElementById("blogFilter");
const blogGrid = document.getElementById("blogGrid");
const noResults = document.getElementById("noResults");
const tagButtons = document.querySelectorAll(".tag-chip");

let selectedTag = "todas";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function filterBlogPosts() {
  if (!blogGrid) return;

  const posts = blogGrid.querySelectorAll(".post-card");
  const searchValue = blogSearch ? normalizeText(blogSearch.value) : "";
  const filterValue = blogFilter ? normalizeText(blogFilter.value) : "todos";

  let visibleCount = 0;

  posts.forEach((post) => {
    const title = normalizeText(post.dataset.title || "");
    const category = normalizeText(post.dataset.category || "");
    const tags = normalizeText(post.dataset.tags || "");

    const matchesSearch =
      title.includes(searchValue) ||
      category.includes(searchValue) ||
      tags.includes(searchValue);

    const matchesCategory =
      filterValue === "todos" || category === filterValue;

    const matchesTag =
      selectedTag === "todas" || tags.includes(normalizeText(selectedTag));

    if (matchesSearch && matchesCategory && matchesTag) {
      post.style.display = "block";
      visibleCount++;
    } else {
      post.style.display = "none";
    }
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

if (blogSearch) {
  blogSearch.addEventListener("input", filterBlogPosts);
}

if (blogFilter) {
  blogFilter.addEventListener("change", filterBlogPosts);
}

if (tagButtons.length) {
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tagButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      selectedTag = button.dataset.tag || "todas";
      filterBlogPosts();
    });
  });
}

// SCROLL SUAVE PARA ÂNCORAS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      const offset = header ? header.offsetHeight : 0;
      const topPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset + 1;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  });
});

// CHAMADA INICIAL
filterBlogPosts();