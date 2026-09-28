export function requireAdmin(req, res, next) {
  const adminSecret = process.env.ADMIN_SECRET || 'luckyadmin2026';
  const token = req.headers['x-admin-token'] || (req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/i, '') : null);

  if (!token || token !== adminSecret) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid or missing admin credentials.' });
  }

  next();
}
