import Fleet from '../models/Fleet.js';
import Package from '../models/Package.js';
import Service from '../models/Service.js';
import Review from '../models/Review.js';
import Setting from '../models/Setting.js';

export async function getPublicFleet(req, res, next) {
  try {
    const data = await Fleet.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getPublicPackages(req, res, next) {
  try {
    const data = await Package.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getPublicServices(req, res, next) {
  try {
    const data = await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getPublicReviews(req, res, next) {
  try {
    const data = await Review.find({ isApproved: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getPublicSettings(req, res, next) {
  try {
    let doc = await Setting.findOne();
    if (!doc) doc = await Setting.create({});
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
}
