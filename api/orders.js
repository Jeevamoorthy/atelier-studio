/**
 * ATELIER STUDIO // ORDERS & ESCROW DATABASE ENDPOINT
 * Endpoint: /api/orders
 * Supports GET (fetch client orders), POST (create new order in DB),
 * and PATCH (update milestone approval and release escrow).
 */

const db = require('../lib/db');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  try {
    // 1. GET: Fetch Orders from DB
    if (req.method === 'GET') {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const userEmail = parsedUrl.searchParams.get('email');
      const orders = db.getOrders(userEmail);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, count: orders.length, orders }));
      return;
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }

    // 2. POST: Create New Escrow Order in DB
    if (req.method === 'POST') {
      const { userEmail, serviceName, tier, budget, eta, notes } = body || {};

      if (!serviceName) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'serviceName is required to create an order.' }));
        return;
      }

      const newOrder = db.createOrder({
        userEmail: userEmail || "guest@client.io",
        serviceName,
        tier,
        budget,
        eta,
        notes
      });

      res.statusCode = 201;
      res.end(JSON.stringify({ success: true, order: newOrder }));
      return;
    }

    // 3. PATCH / PUT: Update Milestone & Escrow
    if (req.method === 'PATCH' || req.method === 'PUT') {
      const { orderId, progress } = body || {};

      if (!orderId) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'orderId is required.' }));
        return;
      }

      const updated = db.updateMilestone(orderId, progress);
      if (!updated) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Order not found in database.' }));
        return;
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, order: updated }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: `Method ${req.method} not allowed.` }));
  } catch (error) {
    console.error("Orders API error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
  }
};
