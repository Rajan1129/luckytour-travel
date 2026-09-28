import Enquiry from '../models/Enquiry.js';
import Fleet from '../models/Fleet.js';
import Package from '../models/Package.js';
import Service from '../models/Service.js';
import Review from '../models/Review.js';
import Setting from '../models/Setting.js';

// --- AUTH ---
export async function adminLogin(req, res) {
  const { username, password } = req.body;
  const adminUser = (process.env.ADMIN_USER || 'admin').trim();
  const adminSecret = (process.env.ADMIN_SECRET || 'luckyadmin2026').trim();

  if (!username || username.trim() !== adminUser || !password || password.trim() !== adminSecret) {
    return res.status(401).json({ success: false, message: 'Invalid admin username or password.' });
  }

  res.json({ success: true, token: adminSecret, message: 'Admin authentication successful.' });
}

export async function adminVerify(req, res) {
  res.json({ success: true, message: 'Token valid' });
}

// --- ENQUIRIES ---
export async function getAdminEnquiries(req, res, next) {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const doc = await Enquiry.findByIdAndUpdate(id, { ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) }, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Enquiry.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    res.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// --- FLEET ---
export async function getAdminFleet(req, res, next) {
  try {
    const data = await Fleet.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createAdminFleet(req, res, next) {
  try {
    const count = await Fleet.countDocuments();
    const doc = await Fleet.create({ ...req.body, order: req.body.order ?? count + 1 });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminFleet(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Fleet.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminFleet(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Fleet.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    res.json({ success: true, message: 'Vehicle deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// --- PACKAGES ---
export async function getAdminPackages(req, res, next) {
  try {
    const data = await Package.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createAdminPackage(req, res, next) {
  try {
    const count = await Package.countDocuments();
    const doc = await Package.create({ ...req.body, order: req.body.order ?? count + 1 });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminPackage(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Package.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminPackage(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Package.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Package not found.' });
    res.json({ success: true, message: 'Package deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// --- SERVICES ---
export async function getAdminServices(req, res, next) {
  try {
    const data = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createAdminService(req, res, next) {
  try {
    const count = await Service.countDocuments();
    const doc = await Service.create({ ...req.body, order: req.body.order ?? count + 1 });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminService(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminService(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Service.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// --- REVIEWS ---
export async function getAdminReviews(req, res, next) {
  try {
    const data = await Review.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createAdminReview(req, res, next) {
  try {
    const count = await Review.countDocuments();
    const doc = await Review.create({ ...req.body, order: req.body.order ?? count + 1 });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminReview(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}

export async function deleteAdminReview(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Review.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, message: 'Review deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

// --- SETTINGS ---
export async function updateAdminSettings(req, res, next) {
  try {
    let doc = await Setting.findOne();
    if (!doc) doc = new Setting(req.body);
    else Object.assign(doc, req.body);
    await doc.save();
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}
