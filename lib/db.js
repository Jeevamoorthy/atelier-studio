/**
 * ATELIER STUDIO // PERSISTENT DATABASE ENGINE
 * Serverless & local compatible persistent JSON database with ACID-safe writes.
 */

const fs = require('fs');
const path = require('path');

// Determine data directory (Vercel uses /tmp in serverless environments, local uses ./data)
const isVercel = process.env.VERCEL || process.env.NOW_REGION;
const DATA_DIR = isVercel ? '/tmp/atelier_data' : path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Initial seed database structure
const INITIAL_DB = {
  users: [
    {
      id: "usr_google_default",
      google_id: "google_1082914812301928",
      email: "sarah.jenkins@lumina-health.io",
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
      credits: 200,
      role: "client",
      created_at: new Date().toISOString()
    }
  ],
  orders: [
    {
      id: "ATL-8921",
      user_email: "sarah.jenkins@lumina-health.io",
      service_name: "Full-Stack Web Application (Next.js)",
      tier: "MVP Sprint",
      budget: 3650,
      status: "Milestone 2 in Progress (65%)",
      progress: 65,
      eta: "4 business days",
      milestones: [
        { name: "Phase 1: Architecture & Database Schema", done: true, approved_at: "2026-10-14" },
        { name: "Phase 2: Authentication & Core Dashboard", done: false, in_progress: true },
        { name: "Phase 3: Stripe Billing & QA Handover", done: false }
      ],
      notes: "Production dashboard with team invites and PostgreSQL setup.",
      created_at: "2026-10-12T10:00:00.000Z"
    }
  ],
  services: [
    { id: "fullstack", name: "Full-Stack Web Application", base_price: 3200 },
    { id: "uiux", name: "Product UI/UX & Design System", base_price: 2400 },
    { id: "ai_agent", name: "AI Integration & Autonomous Workflows", base_price: 2800 },
    { id: "mobile", name: "Cross-Platform Mobile Application", base_price: 3600 },
    { id: "branding", name: "Brand Identity & Visual System", base_price: 1800 },
    { id: "audit", name: "Code Architecture & Security Audit", base_price: 1600 }
  ]
};

function ensureDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error("Error creating database directory:", err);
  }
}

function readDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read DB file, returning initial state:", err);
    return INITIAL_DB;
  }
}

function writeDb(data) {
  ensureDb();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Database write error:", err);
    return false;
  }
}

// ==========================================
// DB OPERATIONS
// ==========================================

const db = {
  // Users
  getUserByEmail(email) {
    const data = readDb();
    return data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  upsertGoogleUser({ googleId, email, name, avatar }) {
    const data = readDb();
    let user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      user.name = name || user.name;
      user.avatar = avatar || user.avatar;
      user.google_id = googleId || user.google_id;
      user.last_login = new Date().toISOString();
    } else {
      user = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        google_id: googleId,
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        avatar: avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        credits: 200,
        role: "client",
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };
      data.users.push(user);
    }

    writeDb(data);
    return user;
  },

  // Orders
  getOrders(userEmail = null) {
    const data = readDb();
    if (!userEmail) return data.orders;
    return data.orders.filter(o => o.user_email.toLowerCase() === userEmail.toLowerCase());
  },

  getOrderById(id) {
    const data = readDb();
    return data.orders.find(o => o.id === id);
  },

  createOrder({ userEmail, serviceName, tier, budget, eta, notes }) {
    const data = readDb();
    const orderId = `ATL-${Math.floor(2000 + Math.random() * 8000)}`;

    const newOrder = {
      id: orderId,
      user_email: (userEmail || "guest@client.io").toLowerCase(),
      service_name: serviceName,
      tier: tier || "MVP Sprint",
      budget: Number(budget) || 3200,
      status: "Initiated • Milestone 1 Escrow Locked",
      progress: 10,
      eta: eta || "10 business days",
      milestones: [
        { name: "Phase 1: Architecture & Technical Discovery", done: false },
        { name: "Phase 2: Core Engineering & Staging Build", done: false },
        { name: "Phase 3: QA Sign-off & IP Repository Transfer", done: false }
      ],
      notes: notes || "Standard client brief specifications.",
      created_at: new Date().toISOString()
    };

    data.orders.unshift(newOrder);
    writeDb(data);
    return newOrder;
  },

  updateMilestone(orderId, newProgress) {
    const data = readDb();
    const order = data.orders.find(o => o.id === orderId);
    if (!order) return null;

    order.progress = Math.min(Math.max(Number(newProgress), 0), 100);
    if (order.progress === 100) {
      order.status = "Delivered & Escrow Released (100%)";
      order.milestones.forEach(m => { m.done = true; });
    } else {
      order.status = `Milestone Approved (${order.progress}%)`;
      if (order.progress >= 33 && order.milestones[0]) order.milestones[0].done = true;
      if (order.progress >= 66 && order.milestones[1]) order.milestones[1].done = true;
    }

    writeDb(data);
    return order;
  }
};

module.exports = db;
