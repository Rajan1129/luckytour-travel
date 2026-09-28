export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err.message === 'Not allowed by CORS') return res.status(403).json({ success: false, message: 'Origin not allowed.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Invalid JSON body.' });
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong. Please call us directly.' });
}
