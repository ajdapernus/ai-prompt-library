/* AI Prompt Library — Banka Slovenije
   Plain JS, no dependencies. Reads window.PROMPTS (from data/prompts.js).
   Everything runs in the browser; no network requests, no analytics.
   Only localStorage is used, to remember the language preference. */

(function () {
  "use strict";

  var STORAGE_KEY = "apl-lang";
  var prompts = (window.PROMPTS || []).slice().sort(function (a, b) {
    return a.order - b.order;
  });

  // UI strings per language. Prompt content itself lives in data/prompts.js.
  var UI = {
    en: {
      banner:
        "Reminder: you may use data classified up to and including “Confidential”. " +
        "Do not paste anything classified above Confidential into AI tools.",
      categories: "Categories",
      searchPlaceholder: "Search prompts…",
      copy: "Copy prompt",
      copied: "Copied!",
      empty: "No prompts match your search.",
      footer:
        "Curated, approved prompts for safe AI use. Runs entirely in your browser — " +
        "no data is sent anywhere.",
      fields: {
        promptTemplate: "Prompt template",
        useCase: "Use case",
        requiredInputs: "Required inputs",
        expectedOutput: "Expected output",
        example: "Example",
      },
    },
    sl: {
      banner:
        "Opomnik: uporabljate lahko podatke do vključno stopnje “Zaupno”. " +
        "Ničesar nad stopnjo Zaupno ne prilepite v orodja UI.",
      categories: "Kategorije",
      searchPlaceholder: "Iskanje pozivov…",
      copy: "Kopiraj poziv",
      copied: "Kopirano!",
      empty: "Noben poziv ne ustreza iskanju.",
      footer:
        "Kurirani, odobreni pozivi za varno uporabo UI. Deluje v celoti v vašem brskalniku — " +
        "noben podatek se nikamor ne pošlje.",
      fields: {
        promptTemplate: "Predloga poziva",
        useCase: "Namen uporabe",
        requiredInputs: "Zahtevani vhodni podatki",
        expectedOutput: "Pričakovani rezultat",
        example: "Primer",
      },
    },
  };

  // Order in which fields are displayed on each card.
  var FIELD_ORDER = [
    "promptTemplate",
    "useCase",
    "requiredInputs",
    "expectedOutput",
    "example",
  ];

  var lang = loadLang();
  var activeId = null; // null = show all categories
  var searchTerm = "";

  // --- DOM references ---
  var bannerEl = document.getElementById("confidentiality-banner");
  var sidebarTitleEl = document.getElementById("sidebar-title");
  var categoryListEl = document.getElementById("category-list");
  var searchEl = document.getElementById("search");
  var listEl = document.getElementById("prompt-list");
  var emptyEl = document.getElementById("empty-state");
  var footerEl = document.getElementById("footer-text");
  var langButtons = document.querySelectorAll(".lang-btn");

  function loadLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "sl") return stored;
    } catch (e) { /* localStorage may be unavailable; fall through */ }
    return "en";
  }

  function saveLang(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  // Normalize for diacritic-insensitive search (č -> c, š -> s, ž -> z, ...).
  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function searchableText(prompt) {
    var f = prompt[lang];
    return normalize(
      [f.title, f.promptTemplate, f.useCase, f.requiredInputs, f.expectedOutput, f.example]
        .join(" ")
    );
  }

  // Renders a text block into an element: consecutive "- " lines become a <ul>,
  // everything else keeps its line breaks (CSS white-space: pre-wrap).
  function renderTextBlock(parent, text) {
    var lines = text.split("\n");
    var i = 0;
    while (i < lines.length) {
      if (/^\s*-\s+/.test(lines[i])) {
        var ul = document.createElement("ul");
        while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
          var li = document.createElement("li");
          li.textContent = lines[i].replace(/^\s*-\s+/, "");
          ul.appendChild(li);
          i++;
        }
        parent.appendChild(ul);
      } else {
        var start = i;
        while (i < lines.length && !/^\s*-\s+/.test(lines[i])) i++;
        var chunk = lines.slice(start, i).join("\n").trim();
        if (chunk) {
          var span = document.createElement("span");
          span.textContent = chunk;
          parent.appendChild(span);
        }
      }
    }
  }

  function copyToClipboard(text, button) {
    function done() {
      var original = UI[lang].copy;
      button.textContent = UI[lang].copied;
      button.classList.add("copied");
      setTimeout(function () {
        button.textContent = original;
        button.classList.remove("copied");
      }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {
        fallbackCopy(text, done);
      });
    } else {
      fallbackCopy(text, done);
    }
  }

  // Fallback for older intranet browsers and some file:// contexts.
  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  function buildCard(prompt) {
    var f = prompt[lang];
    var labels = UI[lang].fields;

    var card = document.createElement("article");
    card.className = "card";
    card.id = "prompt-" + prompt.id;

    var h = document.createElement("h3");
    h.className = "card-title";
    h.textContent = f.title;
    card.appendChild(h);

    FIELD_ORDER.forEach(function (key) {
      if (!f[key]) return;
      var field = document.createElement("div");
      field.className = "field" + (key === "promptTemplate" ? " template-field" : "");

      var label = document.createElement("span");
      label.className = "field-label";
      label.textContent = labels[key];
      field.appendChild(label);

      var body = document.createElement("div");
      body.className = "field-body";
      renderTextBlock(body, f[key]);
      field.appendChild(body);

      if (key === "promptTemplate") {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-btn";
        btn.textContent = UI[lang].copy;
        btn.addEventListener("click", function () {
          copyToClipboard(f.promptTemplate, btn);
        });
        field.appendChild(btn);
      }

      card.appendChild(field);
    });

    return card;
  }

  function renderSidebar() {
    sidebarTitleEl.textContent = UI[lang].categories;
    categoryListEl.innerHTML = "";
    prompts.forEach(function (prompt) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = prompt[lang].title;
      if (prompt.id === activeId) btn.setAttribute("aria-current", "true");
      btn.addEventListener("click", function () {
        activeId = prompt.id === activeId ? null : prompt.id;
        searchTerm = "";
        searchEl.value = "";
        renderSidebar();
        renderList();
        var card = document.getElementById("prompt-" + prompt.id);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      li.appendChild(btn);
      categoryListEl.appendChild(li);
    });
  }

  function renderList() {
    listEl.innerHTML = "";
    var term = normalize(searchTerm.trim());
    var visible = prompts.filter(function (prompt) {
      if (activeId && prompt.id !== activeId) return false;
      if (term && searchableText(prompt).indexOf(term) === -1) return false;
      return true;
    });

    if (visible.length === 0) {
      emptyEl.textContent = UI[lang].empty;
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    visible.forEach(function (prompt) {
      listEl.appendChild(buildCard(prompt));
    });
  }

  function renderStaticChrome() {
    document.documentElement.lang = lang;
    bannerEl.textContent = UI[lang].banner;
    searchEl.placeholder = UI[lang].searchPlaceholder;
    footerEl.textContent = UI[lang].footer;
    langButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  }

  function setLanguage(next) {
    if (next === lang) return;
    lang = next;
    saveLang(lang);
    renderStaticChrome();
    renderSidebar();
    renderList();
  }

  // --- Wire up events ---
  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.dataset.lang);
    });
  });

  searchEl.addEventListener("input", function () {
    searchTerm = searchEl.value;
    if (searchTerm.trim()) activeId = null; // searching clears category filter
    renderSidebar();
    renderList();
  });

  // --- Initial render ---
  renderStaticChrome();
  renderSidebar();
  renderList();
})();
