(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const chatForm = $("#chatForm");
  const chatInput = $("#chatInput");
  const chatMessages = $("#chatMessages");
  const suggestions = $("#suggestions");
  const charCount = $("#charCount");
  const menuToggle = $("#menuToggle");
  const mobileNav = $("#mobileNav");
  const MAX_MESSAGES = 16;

  // All responses come from this curated local knowledge base. No network calls are made.
  const knowledge = {
    projects: {
      quartly: "Quartly is a personal finance tracker focused on helping people organize expenses and see useful financial insights. The public demo is https://quartly.onrender.com. The portfolio lists React, TypeScript, and charting among its technologies.",
      clenzora: "Clenzora is an e-commerce storefront for household cleaning products. Its planned architecture uses React and TypeScript on the frontend, Supabase for backend services and data, and Razorpay for payments. Visit https://clenzoraclean.com.",
      lexyra: "Lexyra is an AI writing-enhancement app concept: it takes rough text and aims to return clearer, more professional wording. The explored stack includes React, TypeScript, FastAPI, and Hugging Face inference providers. Its inference-provider setup has had credit and routing limitations, so I won't claim every AI feature is currently live.",
      nyxora: "Nyxora is a local-language-model learning project, previously called Dream Compiler. It explores SmolLM2, llama.cpp, and the process of running and experimenting with a model locally.",
      foldersapling: "FolderSapling is a project focused on presenting and working with generated project folder structures. Its UI work has included responsive React layouts.",
      flashframe: "FlashFrame OCR is an OCR-focused project. The broader toolkit explored in Kenny's work includes browser-side OCR and text extraction. Ask for a verified repository or live demo through the GitHub profile.",
      geotrail: "GeoTrail, also called TouriSight, is a location and exploration-oriented project idea. I don't have enough verified detail here to claim a current live deployment.",
      echodrive: "EchoDrive is an Electron desktop-app project. I don't have a verified public demo URL in this knowledge base."
    },
    stack: "The stack represented here includes TypeScript, JavaScript, Python, SQL, React, Vite, HTML, CSS, Tailwind CSS, Node.js, Express, FastAPI, SQLite, PostgreSQL, Supabase, Git/GitHub, Ollama, llama.cpp, Transformers.js, OCR, embeddings, and local LLM experimentation. This is a practical working toolkit, not a claim of expert-level mastery in every item.",
    about: "Kenny Richardson is an engineering student focused on AI and full-stack development. He likes building usable applications, exploring how AI systems work, and learning through implementation. His stated positioning is AI Engineer & Full-Stack Developer.",
    education: "Kenny is studying engineering with a focus on Computer Science and AI/ML. This portfolio deliberately avoids publishing private contact details or unverified academic claims.",
    contact: "The safest public contact path listed here is Kenny's GitHub profile: https://github.com/kennykrichardson. You can also explore the public portfolio at https://kennykrichardson.onrender.com.",
    assistant: "This assistant is entirely frontend JavaScript. It normalizes the user's text, matches keywords and phrases against explicit intent rules, then returns curated responses. It makes no API calls, sends no chat data to a server, and cannot reason beyond its programmed knowledge. It is deterministic by design.",
    hiring: "For collaboration or opportunities, start with Kenny's GitHub profile: https://github.com/kennykrichardson. The portfolio doesn't currently publish a verified email address, so I won't invent one.",
    resume: "A resume PDF has not been bundled in this starter project. Until Kenny adds the actual file, use the GitHub profile for verified public work: https://github.com/kennykrichardson.",
    ai: "Kenny's AI-related interests include language models, local inference, OCR, embeddings, and integrating AI into useful applications. Nyxora explores local LLM workflows; Lexyra explores AI-assisted writing. The portfolio assistant itself is intentionally rule-based rather than an LLM.",
    default: "I don't have a verified answer for that in my local knowledge base. Try asking about projects, Quartly, Clenzora, Lexyra, Nyxora, the tech stack, AI experience, or how this chatbot works. You can also check the GitHub profile: https://github.com/kennykrichardson."
  };

  const rules = [
    { keys: ["how does this chatbot work", "how does the chatbot work", "how do you work", "how are you built", "how does this work", "deterministic", "frontend only", "front end only", "source code of this assistant"], answer: () => knowledge.assistant },
    { keys: ["quartly", "finance tracker", "personal finance", "money tracker"], answer: () => knowledge.projects.quartly },
    { keys: ["clenzora", "cleaning store", "cleaning products", "ecommerce", "e-commerce"], answer: () => knowledge.projects.clenzora },
    { keys: ["lexyra", "writing assistant", "writing enhancement", "polish my writing"], answer: () => knowledge.projects.lexyra },
    { keys: ["nyxora", "smollm", "llama.cpp", "local model", "local llm", "dream compiler"], answer: () => knowledge.projects.nyxora },
    { keys: ["foldersapling", "folder sapling"], answer: () => knowledge.projects.foldersapling },
    { keys: ["flashframe", "ocr", "text recognition"], answer: () => knowledge.projects.flashframe },
    { keys: ["geotrail", "tourisight", "geo trail"], answer: () => knowledge.projects.geotrail },
    { keys: ["echodrive", "electron app"], answer: () => knowledge.projects.echodrive },
    { keys: ["project", "projects", "built", "portfolio work", "what have you made", "what has kenny made"], answer: () => "Selected projects in this portfolio:\n\n• Quartly — personal finance tracker. Live: https://quartly.onrender.com\n• Clenzora — cleaning-products storefront. Live: https://clenzoraclean.com\n• Lexyra — AI writing-enhancement concept.\n• Nyxora — local language-model experiments.\n\nOther projects associated with Kenny include FolderSapling, FlashFrame OCR, GeoTrail/TouriSight, and EchoDrive. Some entries are concepts or works in progress, so I distinguish those from verified live deployments." },
    { keys: ["tech stack", "technology", "technologies", "programming language", "languages", "tools", "framework", "skills", "what can kenny code", "what does kenny use"], answer: () => knowledge.stack },
    { keys: ["who is kenny", "about kenny", "about me", "tell me about kenny", "who are you", "introduce"], answer: () => knowledge.about },
    { keys: ["education", "college", "degree", "study", "studying"], answer: () => knowledge.education },
    { keys: ["contact", "github", "reach kenny", "email", "hire", "hiring", "collaborate", "opportunity", "job"], answer: () => knowledge.contact + "\n\nFor opportunities: " + knowledge.hiring },
    { keys: ["resume", "cv", "curriculum vitae"], answer: () => knowledge.resume },
    { keys: ["artificial intelligence", "machine learning", " ai ", "llm", "rag", "embedding", "inference"], answer: () => knowledge.ai },
    { keys: ["thank", "thanks", "cheers"], answer: () => "You're welcome. I have a very limited vocabulary, but I try to deploy it responsibly." },
    { keys: ["hello", "hi ", "hey", "good morning", "good evening"], answer: () => "Hey! Ask me about Kenny's projects, stack, AI work, or how this frontend-only assistant is implemented." },
    { keys: ["what can i ask", "help", "examples", "what do you know"], answer: () => "Try one of these:\n• What projects has Kenny built?\n• Tell me about Quartly.\n• What is Kenny's tech stack?\n• What is Nyxora?\n• How does this chatbot work?\n• How can I contact Kenny?" }
  ];

  function normalize(text) {
    return ` ${text.toLowerCase().normalize("NFKD").replace(/[^\w\s.+#/-]/g, " ").replace(/\s+/g, " ").trim()} `;
  }
  function getAnswer(question) {
    const q = normalize(question);
    for (const rule of rules) {
      if (rule.keys.some(key => q.includes(normalize(key)))) return rule.answer();
    }
    return knowledge.default;
  }
  function safeLinkify(text) {
    const fragment = document.createDocumentFragment();
    const pattern = /(https:\/\/[^\s)]+)/g;
    let last = 0, match;
    while ((match = pattern.exec(text)) !== null) {
      fragment.append(document.createTextNode(text.slice(last, match.index)));
      const a = document.createElement("a");
      a.href = match[0].replace(/[.,!?]+$/, "");
      a.textContent = a.href;
      a.target = "_blank";
      a.rel = "noreferrer";
      fragment.append(a);
      last = pattern.lastIndex;
    }
    fragment.append(document.createTextNode(text.slice(last)));
    return fragment;
  }
  function addMessage(text, who) {
    const message = document.createElement("div");
    message.className = `message ${who === "user" ? "user-message" : "assistant-message"}`;
    const tag = document.createElement("span");
    tag.className = "message-tag";
    tag.textContent = who === "user" ? "YOU / INPUT" : "KR.AI / RESPONSE";
    const p = document.createElement("p");
    p.append(safeLinkify(text));
    message.append(tag, p);
    chatMessages.append(message);
    while (chatMessages.children.length > MAX_MESSAGES) chatMessages.firstElementChild.remove();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function submitQuestion(question) {
    const clean = question.trim();
    if (!clean) return;
    addMessage(clean, "user");
    addMessage(getAnswer(clean), "assistant");
    chatInput.value = "";
    charCount.textContent = "0/240";
    chatInput.focus();
  }

  chatForm.addEventListener("submit", event => {
    event.preventDefault();
    submitQuestion(chatInput.value);
  });
  chatInput.addEventListener("input", () => {
    charCount.textContent = `${chatInput.value.length}/240`;
  });
  suggestions.addEventListener("click", event => {
    const button = event.target.closest("button[data-question]");
    if (button) submitQuestion(button.dataset.question);
  });
  $("#clearChat").addEventListener("click", () => {
    chatMessages.replaceChildren();
    addMessage("Conversation reset. Ask about projects, skills, or the implementation.", "assistant");
  });

  const storedTheme = (() => { try { return localStorage.getItem("kr-theme"); } catch { return null; } })();
  if (storedTheme === "dark" || storedTheme === "light") root.dataset.theme = storedTheme;
  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("kr-theme", next); } catch { /* Theme still works without storage. */ }
    themeToggle.setAttribute("aria-label", `Switch to ${next === "dark" ? "dark" : "light"} theme`);
  });

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileNav.classList.toggle("open", open);
  });
  mobileNav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  $("#copyEmail").addEventListener("click", async () => {
    const feedback = $("#copyFeedback");
    const text = "github.com/kennykrichardson";
    try {
      await navigator.clipboard.writeText(text);
      feedback.textContent = "GitHub profile handle copied.";
    } catch {
      feedback.textContent = "Use this public profile: github.com/kennykrichardson";
    }
  });

  $("#year").textContent = new Date().getFullYear();
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-link");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach(section => observer.observe(section));
  }
})();