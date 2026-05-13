const deck = document.getElementById("deck");
const dots = document.getElementById("dots");
const counter = document.getElementById("counter");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentSlide = 0;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderBullets(items) {
  if (!items?.length) return "";
  return `
    <ul class="bullets">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderTags(tags) {
  if (!tags?.length) return "";
  return `
    <div class="tag-row">
      ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
}

function renderCards(cards) {
  if (!cards?.length) return "";
  return `
    <div class="card-grid">
      ${cards
        .map(
          (card) => `
            <article class="info-card">
              <h3 class="card-title">${escapeHtml(card.title)}</h3>
              <p class="card-text">${escapeHtml(card.text)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderColumns(columns) {
  if (!columns?.length) return "";
  return `
    <div class="columns">
      ${columns
        .map(
          (column) => `
            <section class="column">
              <h3 class="column-title">${escapeHtml(column.title)}</h3>
              <ul>
                ${column.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderStats(stats) {
  if (!stats?.length) return "";
  return `
    <div class="stat-grid">
      ${stats
        .map(
          (stat) => `
            <article class="stat-card">
              <div class="stat-value">${escapeHtml(stat.value)}</div>
              <div class="stat-label">${escapeHtml(stat.label)}</div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderFlow(steps) {
  if (!steps?.length) return "";
  return `
    <div class="flow">
      ${steps.map((step) => `<div class="flow-step">${escapeHtml(step)}</div>`).join("")}
    </div>
  `;
}

function renderComparison(items) {
  if (!items?.length) return "";
  return `
    <div class="comparison-grid">
      ${items
        .map(
          (item) => `
            <article class="comparison-card">
              <h3 class="comparison-label">${escapeHtml(item.label)}</h3>
              <p class="comparison-value">${escapeHtml(item.value)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderSlide(slide, index) {
  const classes = ["slide"];
  if (index === 0) classes.push("active");
  if (slide.type === "cover") classes.push("slide-cover");
  if (slide.type === "closing") classes.push("slide-closing");

  const label = slide.type === "cover"
    ? `<p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>`
    : `<p class="section-label">${escapeHtml(slide.section)}</p>`;

  const subtitle = slide.subtitle ? `<p class="subtitle">${escapeHtml(slide.subtitle)}</p>` : "";
  const meta = slide.meta?.length
    ? `<div class="meta-row">${slide.meta.map((item) => `<span class="meta-pill">${escapeHtml(item)}</span>`).join("")}</div>`
    : "";
  const note = slide.note ? `<p class="note">${escapeHtml(slide.note)}</p>` : "";
  const quote = slide.quote ? `<p class="quote">${escapeHtml(slide.quote)}</p>` : "";

  return `
    <article class="${classes.join(" ")}" data-slide="${index}">
      <div class="slide-content">
        ${label}
        <h1 class="title">${escapeHtml(slide.title)}</h1>
        ${slide.type === "cover" ? '<div class="accent-line"></div>' : ""}
        ${subtitle}
        ${meta}
        ${renderCards(slide.cards)}
        ${renderColumns(slide.columns)}
        ${renderStats(slide.stats)}
        ${renderFlow(slide.flow)}
        ${renderComparison(slide.comparison)}
        ${renderBullets(slide.bullets)}
        ${renderTags(slide.tags)}
        ${note}
        ${quote}
      </div>
    </article>
  `;
}

function updateNavigation() {
  const slides = deck.querySelectorAll(".slide");
  const dotButtons = dots.querySelectorAll(".dot");

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  dotButtons.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, SLIDES.length - 1));
  updateNavigation();
}

function boot() {
  deck.innerHTML = SLIDES.map(renderSlide).join("");
  dots.innerHTML = SLIDES
    .map((_, index) => `<button class="dot${index === 0 ? " active" : ""}" type="button" aria-label="Aller a la diapositive ${index + 1}"></button>`)
    .join("");

  dots.querySelectorAll(".dot").forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  previousButton.addEventListener("click", () => goToSlide(currentSlide - 1));
  nextButton.addEventListener("click", () => goToSlide(currentSlide + 1));

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      goToSlide(currentSlide + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(currentSlide - 1);
    }
  });

  updateNavigation();
}

boot();
