import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { createEnquiry } from '../controllers/enquiryController.js';
import { enquiryRules, handleValidation } from '../middleware/validate.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import {
  getPublicFleet,
  getPublicPackages,
  getPublicServices,
  getPublicReviews,
  getPublicSettings
} from '../controllers/publicController.js';
import {
  adminLogin,
  adminVerify,
  getAdminEnquiries,
  updateAdminEnquiry,
  deleteAdminEnquiry,
  getAdminFleet,
  createAdminFleet,
  updateAdminFleet,
  deleteAdminFleet,
  getAdminPackages,
  createAdminPackage,
  updateAdminPackage,
  deleteAdminPackage,
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  getAdminReviews,
  createAdminReview,
  updateAdminReview,
  deleteAdminReview,
  updateAdminSettings
} from '../controllers/adminController.js';

const router = Router();

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  message: { success: false, message: 'Too many enquiries. Please try again later or call us.' }
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

// Customer enquiry submission
router.post('/enquiries', enquiryLimiter, enquiryRules, handleValidation, createEnquiry);

// Public data endpoints (live connected to MongoDB)
router.get('/fleet', getPublicFleet);
router.get('/packages', getPublicPackages);
router.get('/services', getPublicServices);
router.get('/reviews', getPublicReviews);
router.get('/settings', getPublicSettings);

// Admin Auth
router.post('/admin/login', adminLimiter, adminLogin);

// Admin Protected Routes
router.use('/admin', requireAdmin);

// Admin Auth Verification
router.get('/admin/verify', adminVerify);

// Admin Enquiry Management
router.get('/admin/enquiries', getAdminEnquiries);
router.patch('/admin/enquiries/:id', updateAdminEnquiry);
router.delete('/admin/enquiries/:id', deleteAdminEnquiry);

// Admin Fleet Management
router.get('/admin/fleet', getAdminFleet);
router.post('/admin/fleet', createAdminFleet);
router.put('/admin/fleet/:id', updateAdminFleet);
router.delete('/admin/fleet/:id', deleteAdminFleet);

// Admin Package Management
router.get('/admin/packages', getAdminPackages);
router.post('/admin/packages', createAdminPackage);
router.put('/admin/packages/:id', updateAdminPackage);
router.delete('/admin/packages/:id', deleteAdminPackage);

// Admin Service Management
router.get('/admin/services', getAdminServices);
router.post('/admin/services', createAdminService);
router.put('/admin/services/:id', updateAdminService);
router.delete('/admin/services/:id', deleteAdminService);

// Admin Review Management
router.get('/admin/reviews', getAdminReviews);
router.post('/admin/reviews', createAdminReview);
router.put('/admin/reviews/:id', updateAdminReview);
router.delete('/admin/reviews/:id', deleteAdminReview);

// Admin Settings Management
router.put('/admin/settings', updateAdminSettings);

export default router;
