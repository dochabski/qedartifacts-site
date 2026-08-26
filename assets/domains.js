const grid = document.querySelector("[data-domain-grid]");

if (grid) {
  fetch("/domains.json", {cache: "no-cache"})
    .then((response) => {
      if (!response.ok) throw new Error(`Domain catalog request failed: ${response.status}`);
      return response.json();
    })
    .then((catalog) => {
      const fragment = document.createDocumentFragment();
      const domains = [...catalog.domains].sort((left, right) =>
        left.name.localeCompare(right.name, "en", {sensitivity: "base"})
      );
      for (const domain of domains) {
        const link = document.createElement("a");
        link.href = `/${domain.slug}/`;
        const number = document.createElement("span");
        number.textContent = domain.portalNumber;
        const title = document.createElement("h3");
        title.textContent = domain.name;
        const summary = document.createElement("p");
        summary.textContent = domain.summary;
        const action = document.createElement("b");
        action.textContent = "Open portal →";
        link.append(number, title, summary, action);
        fragment.append(link);
      }
      grid.replaceChildren(fragment);
    })
    .catch((error) => console.warn("Keeping the built-in domain fallback.", error));
}
