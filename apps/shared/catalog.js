const catalogRoot = document.querySelector("#app-catalog");
const catalogSummary = document.querySelector("#catalog-summary");

function textElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}

function renderEmptyCatalog() {
  const empty = document.createElement("article");
  empty.className = "catalog-empty";
  empty.append(
    textElement("p", "eyebrow", "Catalog established"),
    textElement("h3", "", "No public tools have been released yet."),
    textElement(
      "p",
      "",
      "The catalog infrastructure is ready. Planned tools will appear here only after their purpose, limitations, public-data boundary, and release status have been reviewed."
    )
  );
  catalogRoot.replaceChildren(empty);
  catalogSummary.textContent = "0 released tools. The catalog is ready for reviewed additions.";
}

function renderApp(app) {
  const card = document.createElement("article");
  card.className = "app-card";

  const top = document.createElement("div");
  top.className = "app-card-top";
  top.append(
    textElement("span", "app-status", app.status),
    textElement("span", "app-version", app.version || "")
  );

  const title = textElement("h3", "", app.name);
  const summary = textElement("p", "", app.summary);
  const link = document.createElement("a");
  link.className = "text-link";
  link.href = app.path;
  link.textContent = "Open tool";
  card.append(top, title, summary, link);
  return card;
}

fetch("catalog.json", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) throw new Error("Catalog unavailable");
    return response.json();
  })
  .then((catalog) => {
    if (!Array.isArray(catalog.apps) || catalog.apps.length === 0) {
      renderEmptyCatalog();
      return;
    }
    catalogRoot.replaceChildren(...catalog.apps.map(renderApp));
    catalogSummary.textContent = `${catalog.apps.length} released ${catalog.apps.length === 1 ? "tool" : "tools"}.`;
  })
  .catch(() => {
    catalogRoot.replaceChildren(textElement("p", "catalog-empty", "The public catalog is temporarily unavailable."));
    catalogSummary.textContent = "Catalog status unavailable.";
  });
