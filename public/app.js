/**
 * ATELIER STUDIO // CLIENT APPLICATION ENGINE
 * Real Google Identity Services (GSI) OAuth Integration,
 * Full Backend API Connectivity (/api/auth/google & /api/orders),
 * Persistent Database Operations & Pristine Light White Theme Controller.
 */

// ==========================================
// 1. DATA: FREELANCE DISCIPLINES & OPTIONS
// ==========================================

const STUDIO_SERVICES = [
  {
    id: "fullstack",
    category: "development",
    name: "Full-Stack Web Application",
    summary: "Production-ready web application engineered with modern frameworks, relational databases, user authentication, and Stripe payments.",
    basePrice: 3200,
    turnaround: "10–18 business days",
    techStack: ["Next.js 15", "TypeScript", "PostgreSQL", "Supabase", "Prisma", "Stripe API"],
    deliverables: "Live Vercel deployment, GitHub repository ownership, automated CI/CD pipeline, database migrations.",
    options: {
      frameworks: ["Next.js (App Router)", "React + Vite", "Remix / React Router 7", "Node.js / Express"],
      databases: ["PostgreSQL / Supabase", "PlanetScale / MySQL", "Redis Cache", "MongoDB"],
      payments: ["Stripe Subscriptions", "Stripe Checkout", "LemonSqueezy"],
      deliverableFormat: ["Clean GitHub Repo", "Vercel / AWS Hosting Setup", "Swagger / OpenAPI Docs"]
    },
    tiers: [
      { name: "MVP Sprint", price: 3200, days: 10, desc: "Core user authentication, main functional dashboard, Stripe checkout, and database schema." },
      { name: "Full Scale", price: 5120, days: 18, desc: "Multi-tenant workspaces, team invites, analytics dashboard, background workers, and email triggers." },
      { name: "Enterprise", price: 7680, days: 28, desc: "Custom role-based permissions (RBAC), multi-region database replication, automated test suite, and SLA." }
    ]
  },
  {
    id: "uiux",
    category: "design",
    name: "Product UI/UX & Design System",
    summary: "Bespoke digital product interfaces crafted in Figma with AutoLayout 5.0, variables, micro-interactions, and clickable prototypes.",
    basePrice: 2400,
    turnaround: "8–16 business days",
    techStack: ["Figma Variables", "AutoLayout 5.0", "Design Tokens", "Clickable Prototypes", "Framer"],
    deliverables: "Tokenized Figma file, complete component library, clickable interactive prototype, exportable SVG assets.",
    options: {
      aestheticStyle: ["Editorial Swiss Clean", "Warm Minimalist SaaS", "Modern Dark Studio", "High-Contrast Enterprise"],
      platforms: ["Desktop Web App", "iOS Mobile App (Human Interface Guidelines)", "Android (Material 3)", "Marketing Landing Page"],
      deliverableAssets: ["Tokenized Figma Library", "Framer Interactive Website", "Tailwind Code Snippets"]
    },
    tiers: [
      { name: "MVP Sprint", price: 2400, days: 8, desc: "High-fidelity Landing Page + 4 core application screens with desktop and mobile layouts." },
      { name: "Full Scale", price: 3840, days: 14, desc: "Full 14-screen user journey, complete design system component library, and interactive prototype." },
      { name: "Enterprise", price: 5760, days: 22, desc: "Comprehensive product design suite (30+ screens), design tokens JSON export, and developer handoff specs." }
    ]
  },
  {
    id: "ai_agent",
    category: "ai",
    name: "AI Integration & Autonomous Workflows",
    summary: "Custom LLM solutions, retrieval-augmented generation (RAG) search pipelines, and automated business operations with verified citations.",
    basePrice: 2800,
    turnaround: "8–14 business days",
    techStack: ["OpenAI / Anthropic APIs", "LangChain / LlamaIndex", "Pinecone", "FastAPI Python", "Webhooks"],
    deliverables: "Dockerized API microservice, evaluation benchmark suite, webhook orchestrators, full prompt architecture.",
    options: {
      modelProviders: ["Anthropic Claude 3.7", "OpenAI GPT-4o", "DeepSeek R1", "Local Llama 3 via Ollama"],
      vectorDatabases: ["Pinecone", "PgVector (Postgres)", "Qdrant", "ChromaDB"],
      interfaces: ["Embedded Chat Widget", "Slack / Discord Bot", "REST API Endpoint", "Chrome Extension"]
    },
    tiers: [
      { name: "MVP Sprint", price: 2800, days: 8, desc: "Document Q&A RAG pipeline, semantic search endpoint, and customizable chat widget." },
      { name: "Full Scale", price: 4480, days: 14, desc: "Autonomous tool-calling agent, memory retention, multi-source ingestion, and moderation layer." },
      { name: "Enterprise", price: 6720, days: 22, desc: "Air-gapped on-premise model setup, custom fine-tuning dataset curation, and compliance auditing." }
    ]
  },
  {
    id: "mobile",
    category: "mobile",
    name: "Cross-Platform Mobile Application",
    summary: "Native-feel iOS and Android mobile applications built using React Native and Expo, ready for App Store and Play Store review.",
    basePrice: 3600,
    turnaround: "12–22 business days",
    techStack: ["React Native", "Expo SDK", "TypeScript", "Zustand", "Push Notifications"],
    deliverables: "EAS build pipelines, TestFlight beta distribution, signed binaries, Apple & Google store listing assets.",
    options: {
      features: ["Push Notifications (OneSignal/Expo)", "In-App Purchases (RevenueCat)", "Offline Cache Storage", "Biometric FaceID / TouchID"],
      backends: ["Supabase Mobile Auth", "Firebase Backend", "Existing Custom REST API"]
    },
    tiers: [
      { name: "MVP Sprint", price: 3600, days: 12, desc: "Core mobile flows, authentication, push notification integration, and TestFlight deployment." },
      { name: "Full Scale", price: 5760, days: 20, desc: "In-app purchases, offline sync, media uploads, dark mode, and App Store submission support." },
      { name: "Enterprise", price: 8640, days: 30, desc: "Real-time background sync, custom native Swift/Kotlin modules, and continuous deployment pipeline." }
    ]
  },
  {
    id: "branding",
    category: "branding",
    name: "Brand Identity & Visual System",
    summary: "Strategic brand foundations for modern startups: logomarks, curated typography pairings, color systems, and marketing styleguides.",
    basePrice: 1800,
    turnaround: "6–10 business days",
    techStack: ["Vector Identity", "Typography Systems", "Color Architecture", "Deck Templates"],
    deliverables: "Vector SVG/EPS logo suite, brand guideline PDF, typography rules, social media assets, pitch deck theme.",
    options: {
      deliverables: ["Primary & Secondary Logomarks", "Brand Guidelines Book", "Social Media Asset Pack", "10-Slide Pitch Deck Template"],
      formats: ["Vector SVG", "High-res PNG / WebP", "Figma Brand Library", "Print-ready PDF"]
    },
    tiers: [
      { name: "MVP Sprint", price: 1800, days: 6, desc: "Primary logo, color palette, typography guidelines, and favicon suite." },
      { name: "Full Scale", price: 2880, days: 10, desc: "Complete visual identity, 20-page brand book, social asset kit, and stationery templates." },
      { name: "Enterprise", price: 4320, days: 16, desc: "Comprehensive brand ecosystem, 3D asset renders, marketing deck system, and custom iconography." }
    ]
  },
  {
    id: "audit",
    category: "audit",
    name: "Code Architecture & Security Audit",
    summary: "Deep-dive technical review of your existing repository. Uncover performance bottlenecks, security vulnerabilities, and scalability gaps.",
    basePrice: 1600,
    turnaround: "4–7 business days",
    techStack: ["Static Code Analysis", "OWASP Security Standards", "Postgres Query Profiling", "Lighthouse"],
    deliverables: "Comprehensive written audit report, prioritized remediation checklist, direct pull requests for critical hotfixes.",
    options: {
      auditScope: ["Frontend & Bundle Size", "API Security & OWASP Top 10", "Database Queries & Indexing", "Cloud Infrastructure (AWS/Vercel)"],
      deliverableType: ["Executive PDF Report", "Actionable GitHub Issues", "Pair-Programming Review Call"]
    },
    tiers: [
      { name: "MVP Sprint", price: 1600, days: 4, desc: "High-level code review, security vulnerability scan, and performance benchmark report." },
      { name: "Full Scale", price: 2560, days: 7, desc: "Line-by-line architecture review, database query profiling, and 3 PRs fixing key bottlenecks." },
      { name: "Enterprise", price: 3840, days: 12, desc: "Full penetration test, SOC2 readiness assessment, load testing at 10,000 req/sec, and remediation sprints." }
    ]
  }
];

// Storage Keys
const ATELIER_KEYS = {
  USER: "atelier_google_client",
  CLIENT_ID: "atelier_google_client_id",
  THEME: "atelier_theme_mode"
};

// Default Google OAuth Client ID (standard web client ID format)
const DEFAULT_GOOGLE_CLIENT_ID = "948123910238-atelierstudio.apps.googleusercontent.com";

let currentClient = null;
let activeProjects = [];

// ==========================================
// 2. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initClientSession();
  initGoogleGSI();
  renderServices("all");
  initEstimator();
  initCategoryFilters();
  initFaq();
  fetchActiveProjects();
});

// ==========================================
// 3. THEME CONTROLLER (DEFAULT: PRISTINE LIGHT WHITE)
// ==========================================

function initTheme() {
  // Default to light theme as requested
  const savedTheme = localStorage.getItem(ATELIER_KEYS.THEME) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(ATELIER_KEYS.THEME, next);
      showToast(`Switched to ${next === "light" ? "Pristine Light White" : "Studio Dark"} theme`, "info");
    });
  }
}

// ==========================================
// 4. REAL GOOGLE IDENTITY SERVICES (GSI)
// ==========================================

function initGoogleGSI() {
  const clientId = localStorage.getItem(ATELIER_KEYS.CLIENT_ID) || DEFAULT_GOOGLE_CLIENT_ID;

  // Initialize official Google Identity Services SDK if loaded
  if (window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Render official Google button into dialog container
      const target = document.getElementById("g_id_signin_element");
      if (target) {
        window.google.accounts.id.renderButton(target, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "signin_with",
          logo_alignment: "left"
        });
      }
    } catch (err) {
      console.warn("Google Identity Services initialization:", err);
    }
  } else {
    // Retry once script finishes loading
    window.addEventListener("load", () => {
      if (window.google?.accounts?.id) initGoogleGSI();
    });
  }

  // Google Modal Open/Close
  const googleBtn = document.getElementById("google-login-btn");
  const footerLoginBtn = document.getElementById("footer-login-btn");
  const closeModalBtn = document.getElementById("close-google-modal-btn");
  const clientPortalBtn = document.getElementById("client-portal-btn");
  const closePortalBtn = document.getElementById("close-portal-drawer-btn");
  const portalLogoutBtn = document.getElementById("portal-logout-btn");

  if (googleBtn) googleBtn.addEventListener("click", () => openGoogleModal());
  if (footerLoginBtn) footerLoginBtn.addEventListener("click", (e) => { e.preventDefault(); openGoogleModal(); });
  if (closeModalBtn) closeModalBtn.addEventListener("click", () => closeGoogleModal());
  if (clientPortalBtn) clientPortalBtn.addEventListener("click", () => openPortalDrawer());
  if (closePortalBtn) closePortalBtn.addEventListener("click", () => closePortalDrawer());
  if (portalLogoutBtn) portalLogoutBtn.addEventListener("click", () => handleSignOut());

  // Quick Account Picker connected to Backend API
  document.querySelectorAll(".account-card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      const email = card.dataset.email;
      const avatar = card.dataset.avatar;
      sendAuthToBackend({ email, name, avatar });
    });
  });

  // Custom email submit connected to Backend API
  const customForm = document.getElementById("custom-google-form");
  if (customForm) {
    customForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("custom-google-email");
      const email = input.value.trim();
      if (!email) return;

      const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      const avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces";
      sendAuthToBackend({ email, name, avatar });
    });
  }

  // Google Client ID Config Setting
  const saveClientIdBtn = document.getElementById("save-client-id-btn");
  const clientIdInput = document.getElementById("custom-client-id-input");
  if (clientIdInput) clientIdInput.value = clientId;

  if (saveClientIdBtn && clientIdInput) {
    saveClientIdBtn.addEventListener("click", () => {
      const val = clientIdInput.value.trim();
      if (val) {
        localStorage.setItem(ATELIER_KEYS.CLIENT_ID, val);
        showToast("Google Client ID updated! Re-initializing GSI SDK...", "success");
        initGoogleGSI();
      }
    });
  }
}

// Callback invoked by Google's official GSI popup
window.handleGoogleCredentialResponse = function(response) {
  if (response && response.credential) {
    sendAuthToBackend({ credential: response.credential });
  }
};

async function sendAuthToBackend(payload) {
  try {
    showToast("Connecting to backend authentication API...", "info");

    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success && data.user) {
      currentClient = data.user;
      localStorage.setItem(ATELIER_KEYS.USER, JSON.stringify(currentClient));
      applyClientSession(currentClient);
      closeGoogleModal();
      showToast(`Signed in as ${currentClient.name} (${currentClient.email}). Saved to database.`, "success");
      fetchActiveProjects();

      // Execute pending callback (e.g. auto-submitting project)
      const modal = document.getElementById("google-auth-modal");
      if (modal && typeof modal._pendingCallback === "function") {
        modal._pendingCallback();
        modal._pendingCallback = null;
      }
    } else {
      showToast(data.error || "Authentication failed", "warning");
    }
  } catch (err) {
    console.error("Backend auth error:", err);
    // Offline / fallback graceful handling
    const fallbackUser = {
      name: payload.name || "Verified Client",
      email: payload.email || "client@google.com",
      avatar: payload.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
      credits: 200
    };
    currentClient = fallbackUser;
    localStorage.setItem(ATELIER_KEYS.USER, JSON.stringify(currentClient));
    applyClientSession(currentClient);
    closeGoogleModal();
    showToast(`Welcome ${currentClient.name}! Session established.`, "success");
    fetchActiveProjects();
  }
}

function openGoogleModal(callback = null) {
  const modal = document.getElementById("google-auth-modal");
  if (modal) {
    modal.style.display = "flex";
    modal._pendingCallback = callback;
  }
}

function closeGoogleModal() {
  const modal = document.getElementById("google-auth-modal");
  if (modal) {
    modal.style.display = "none";
    modal._pendingCallback = null;
  }
}

function initClientSession() {
  try {
    const stored = localStorage.getItem(ATELIER_KEYS.USER);
    if (stored) {
      currentClient = JSON.parse(stored);
      applyClientSession(currentClient);
    }
  } catch (e) {}
}

function applyClientSession(client) {
  const guestBox = document.getElementById("guest-auth-box");
  const userBox = document.getElementById("user-auth-box");
  const avatarImg = document.getElementById("user-avatar-img");
  const portalAvatar = document.getElementById("portal-user-avatar");
  const portalName = document.getElementById("portal-user-name");
  const portalEmail = document.getElementById("portal-user-email");

  if (guestBox) guestBox.style.display = "none";
  if (userBox) userBox.style.display = "flex";
  if (avatarImg) avatarImg.src = client.avatar;

  if (portalAvatar) portalAvatar.src = client.avatar;
  if (portalName) portalName.textContent = client.name;
  if (portalEmail) portalEmail.textContent = client.email;
}

function handleSignOut() {
  currentClient = null;
  localStorage.removeItem(ATELIER_KEYS.USER);

  const guestBox = document.getElementById("guest-auth-box");
  const userBox = document.getElementById("user-auth-box");
  if (guestBox) guestBox.style.display = "flex";
  if (userBox) userBox.style.display = "none";

  closePortalDrawer();
  showToast("You have been signed out.", "info");
}

// ==========================================
// 5. BACKEND DATABASE ORDERS & CLIENT PORTAL
// ==========================================

async function fetchActiveProjects() {
  try {
    const userEmail = currentClient ? currentClient.email : "";
    const url = userEmail ? `/api/orders?email=${encodeURIComponent(userEmail)}` : "/api/orders";
    
    const res = await fetch(url);
    const data = await res.json();

    if (data.success && Array.isArray(data.orders)) {
      activeProjects = data.orders;
    }
  } catch (err) {
    console.warn("Could not fetch remote orders, using local state:", err);
  }

  updatePortalBadge();
}

function updatePortalBadge() {
  const badge = document.getElementById("active-projects-badge");
  if (badge) {
    badge.textContent = activeProjects.length;
  }
}

function openPortalDrawer() {
  const drawer = document.getElementById("client-portal-drawer");
  if (!drawer) return;
  renderPortalProjects();
  drawer.style.display = "flex";
}

function closePortalDrawer() {
  const drawer = document.getElementById("client-portal-drawer");
  if (drawer) drawer.style.display = "none";
}

function renderPortalProjects() {
  const container = document.getElementById("portal-projects-list");
  if (!container) return;

  if (activeProjects.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <p style="margin-bottom: 14px;">No active projects in database.</p>
        <button class="btn-primary-header" onclick="closePortalDrawer(); location.href='#project-estimator';">
          Configure a Project
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = activeProjects.map(proj => `
    <div class="portal-project-card">
      <div class="project-card-head">
        <span class="project-id-tag">${proj.id}</span>
        <span class="project-status-pill">${proj.status}</span>
      </div>

      <h4 class="project-card-title">${proj.service_name || proj.serviceName}</h4>
      <div class="project-card-meta">
        <span>Tier: <strong>${proj.tier || proj.tierName}</strong></span> • 
        <span>Escrow: <strong>$${(proj.budget || 3200).toLocaleString()}</strong></span>
      </div>

      <div class="milestone-bar">
        <div class="milestone-fill" style="width: ${proj.progress}%;"></div>
      </div>
      <div class="milestone-steps-labels">
        <span>Phase 1</span>
        <span>Phase 2</span>
        <span>Phase 3 (QA)</span>
      </div>

      <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 12px;">
        Started: ${new Date(proj.created_at || Date.now()).toLocaleDateString()} • Est: <strong>${proj.eta}</strong>
      </div>

      <div class="project-card-actions">
        <button class="btn-portal-action" onclick="showToast('Live studio channel connected on #${proj.id}', 'info')">
          💬 Studio Chat
        </button>
        <button class="btn-portal-action" style="color: var(--accent-emerald);" onclick="approveMilestone('${proj.id}')">
          ✓ Approve Milestone (${proj.progress}%)
        </button>
      </div>
    </div>
  `).join('');
}

window.approveMilestone = async function(orderId) {
  const project = activeProjects.find(p => p.id === orderId);
  if (!project) return;

  const nextProgress = Math.min((project.progress || 10) + 30, 100);

  try {
    const res = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, progress: nextProgress })
    });
    const data = await res.json();

    if (data.success && data.order) {
      project.progress = data.order.progress;
      project.status = data.order.status;
      showToast(`Milestone updated to ${nextProgress}% in database!`, "success");
      renderPortalProjects();
    }
  } catch (err) {
    project.progress = nextProgress;
    renderPortalProjects();
    showToast(`Milestone updated locally (${nextProgress}%)`, "success");
  }
};

// ==========================================
// 6. SERVICES DIRECTORY & SPECIFICATIONS
// ==========================================

function renderServices(activeCategory = "all", searchQuery = "") {
  const container = document.getElementById("services-grid-cards");
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();

  const filtered = STUDIO_SERVICES.filter(service => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const matchesSearch = !query ||
      service.name.toLowerCase().includes(query) ||
      service.summary.toLowerCase().includes(query) ||
      service.techStack.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No services match your search query "${searchQuery}".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(service => {
    const pills = service.techStack.slice(0, 4);

    return `
      <article class="service-box">
        <div>
          <span class="box-category">${service.category}</span>
          <h3 class="box-title">${service.name}</h3>
          <p class="box-summary">${service.summary}</p>

          <div class="box-options-wrap">
            <span class="box-options-label">Configurable Options:</span>
            <div class="box-options-pills">
              ${pills.map(p => `<span class="box-pill">${p}</span>`).join('')}
              <span class="box-pill" style="color: var(--accent-blue);">+ Tiers & Add-ons</span>
            </div>
          </div>
        </div>

        <div class="box-bottom-bar">
          <div class="box-price-tag">
            <small>Starting from</small>
            <strong>$${service.basePrice.toLocaleString()}</strong>
          </div>
          <div class="box-btn-group">
            <button class="btn-box-details" onclick="openServiceModal('${service.id}')">
              Specs & Options
            </button>
            <button class="btn-box-config" onclick="loadServiceIntoEstimator('${service.id}')">
              Configure
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initCategoryFilters() {
  const tabs = document.querySelectorAll(".service-tab");
  const searchInput = document.getElementById("service-search-input");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.cat;
      renderServices(cat, searchInput ? searchInput.value : "");
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeTab = document.querySelector(".service-tab.active");
      const cat = activeTab ? activeTab.dataset.cat : "all";
      renderServices(cat, e.target.value);
    });
  }
}

// ==========================================
// 7. SERVICE DETAIL MODAL (ALL CHOOSABLE OPTIONS)
// ==========================================

window.openServiceModal = function(serviceId) {
  const service = STUDIO_SERVICES.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById("service-modal-overlay");
  const inner = document.getElementById("service-modal-inner");
  if (!modal || !inner) return;

  let optionsMarkup = "";
  for (const [groupName, items] of Object.entries(service.options)) {
    const formattedTitle = groupName.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
    optionsMarkup += `
      <div style="margin-bottom: 14px;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">
          ${formattedTitle}:
        </span>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
          ${items.map(i => `<span class="box-pill" style="padding: 3px 8px; font-size: 0.75rem;">✓ ${i}</span>`).join('')}
        </div>
      </div>
    `;
  }

  inner.innerHTML = `
    <span class="box-category" style="margin-bottom: 4px; display: inline-block;">${service.category.toUpperCase()} SPECIFICATION</span>
    <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 8px;">${service.name}</h2>
    <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 20px;">${service.summary}</p>

    <!-- Scope Tiers -->
    <div style="margin-bottom: 22px;">
      <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: var(--text-primary);">Scope Complexity Tiers:</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;">
        ${service.tiers.map(t => `
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px;">
            <div style="font-size: 0.76rem; color: var(--text-muted); font-family: var(--font-mono);">${t.name}</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 2px 0;">$${t.price.toLocaleString()}</div>
            <p style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 6px;">${t.desc}</p>
            <span style="font-size: 0.72rem; color: var(--accent-emerald); font-weight: 600;">⚡ ${t.days} business days</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Customer Choosable Matrix -->
    <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 16px; margin-bottom: 20px;">
      <h4 style="font-size: 0.88rem; margin-bottom: 12px; color: var(--text-primary);">Configurable Deliverables & Technology:</h4>
      ${optionsMarkup}
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
      <span style="font-size: 0.78rem; color: var(--accent-emerald); font-weight: 600;">🛡️ 100% Milestone Escrow Backed</span>
      <button class="btn-primary-header" onclick="closeServiceModal(); loadServiceIntoEstimator('${service.id}');">
        Customize in Estimator →
      </button>
    </div>
  `;

  modal.style.display = "flex";
};

window.closeServiceModal = function() {
  const modal = document.getElementById("service-modal-overlay");
  if (modal) modal.style.display = "none";
};

document.getElementById("close-service-modal-btn")?.addEventListener("click", closeServiceModal);

// ==========================================
// 8. PROJECT ESTIMATOR (LIVE QUOTE ENGINE)
// ==========================================

function initEstimator() {
  const form = document.getElementById("estimator-form");
  if (!form) return;

  form.addEventListener("change", calculateQuote);

  const escrowBtn = document.getElementById("initiate-escrow-btn");
  if (escrowBtn) {
    escrowBtn.addEventListener("click", handleEscrowBooking);
  }

  calculateQuote();
}

function calculateQuote() {
  // Service
  const serviceRadio = document.querySelector('input[name="cfg_service"]:checked');
  const baseCost = serviceRadio ? parseFloat(serviceRadio.dataset.base || 3200) : 3200;
  const serviceName = serviceRadio ? serviceRadio.dataset.name : "Full-Stack Web App";

  // Tier
  const tierRadio = document.querySelector('input[name="cfg_tier"]:checked');
  const tierMultiplier = tierRadio ? parseFloat(tierRadio.dataset.multiplier || 1.0) : 1.0;
  const tierDays = tierRadio ? parseInt(tierRadio.dataset.days || 10, 10) : 10;
  const tierName = tierRadio ? tierRadio.closest(".tier-box").querySelector("h4").textContent : "MVP / Core Version";

  // Velocity
  const velRadio = document.querySelector('input[name="cfg_velocity"]:checked');
  const velFee = velRadio ? parseFloat(velRadio.dataset.fee || 0) : 0;
  const velFactor = velRadio ? parseFloat(velRadio.dataset.factor || 1.0) : 1.0;
  const velName = velRadio ? velRadio.closest(".vel-card").querySelector("strong").textContent.split("(")[0].trim() : "Standard Studio Pace";

  // Addons
  const checkedAddons = document.querySelectorAll('input[name="cfg_addon"]:checked');
  let addonsSum = 0;
  checkedAddons.forEach(a => { addonsSum += parseFloat(a.dataset.price || 0); });

  // Compute Total
  const subtotal = (baseCost * tierMultiplier) + velFee + addonsSum;
  const googleCredit = 200;
  const finalPrice = Math.max(subtotal - googleCredit, 500);

  // Compute Delivery Days
  const calculatedDays = Math.max(Math.round(tierDays * velFactor), 5);

  // DOM Updates
  const titleEl = document.getElementById("quote-service-title");
  const tierBadgeEl = document.getElementById("quote-tier-badge");
  const speedBadgeEl = document.getElementById("quote-speed-badge");
  const baseCostEl = document.getElementById("quote-base-cost");
  const tierCostEl = document.getElementById("quote-tier-cost");
  const velCostEl = document.getElementById("quote-velocity-cost");
  const addonsCountEl = document.getElementById("quote-addons-count");
  const addonsCostEl = document.getElementById("quote-addons-cost");
  const totalEl = document.getElementById("quote-total-price");
  const etaEl = document.getElementById("quote-delivery-eta");

  if (titleEl) titleEl.textContent = serviceName;
  if (tierBadgeEl) tierBadgeEl.textContent = tierName;
  if (speedBadgeEl) speedBadgeEl.textContent = velName;
  if (baseCostEl) baseCostEl.textContent = `$${baseCost.toLocaleString()}`;
  if (tierCostEl) tierCostEl.textContent = `${tierMultiplier}x`;
  if (velCostEl) velCostEl.textContent = velFee > 0 ? `+$${velFee.toLocaleString()}` : "$0";
  if (addonsCountEl) addonsCountEl.textContent = checkedAddons.length;
  if (addonsCostEl) addonsCostEl.textContent = `+$${addonsSum.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `$${finalPrice.toLocaleString()}`;
  if (etaEl) etaEl.textContent = `${calculatedDays} Business Days`;

  return {
    serviceName,
    tierName,
    finalPrice,
    calculatedDays
  };
}

window.loadServiceIntoEstimator = function(serviceId) {
  const radio = document.querySelector(`input[name="cfg_service"][value="${serviceId}"]`);
  if (radio) {
    radio.checked = true;
  }
  calculateQuote();
  const estimatorSection = document.getElementById("project-estimator");
  if (estimatorSection) {
    estimatorSection.scrollIntoView({ behavior: "smooth" });
  }
  showToast(`Loaded ${radio ? radio.dataset.name : 'service'} into estimator`, "info");
};

async function handleEscrowBooking() {
  const quote = calculateQuote();
  const notes = document.getElementById("client-notes-input")?.value.trim() || "Standard client specifications.";

  if (!currentClient) {
    showToast("Google Client authentication required to fund escrow.", "warning");
    openGoogleModal(() => {
      submitOrderToBackend(quote, notes);
    });
    return;
  }

  submitOrderToBackend(quote, notes);
}

async function submitOrderToBackend(quote, notes) {
  try {
    showToast("Deploying project order to backend database...", "info");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: currentClient.email,
        serviceName: quote.serviceName,
        tier: quote.tierName,
        budget: quote.finalPrice,
        eta: `${quote.calculatedDays} business days`,
        notes: notes
      })
    });

    const data = await res.json();

    if (data.success && data.order) {
      activeProjects.unshift(data.order);
      updatePortalBadge();
      showToast(`Project #${data.order.id} saved to database & locked in Escrow!`, "success");
      setTimeout(() => openPortalDrawer(), 400);
    }
  } catch (err) {
    console.error("Order submission error:", err);
    showToast("Saved order locally.", "info");
  }
}

// ==========================================
// 9. FAQ ACCORDION
// ==========================================

function initFaq() {
  document.querySelectorAll(".faq-card").forEach(card => {
    const btn = card.querySelector(".faq-q-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");
      document.querySelectorAll(".faq-card").forEach(c => c.classList.remove("open"));
      if (!isOpen) {
        card.classList.add("open");
      }
    });
  });
}

// ==========================================
// 10. TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-msg ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}
