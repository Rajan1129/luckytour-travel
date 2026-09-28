import Enquiry from '../models/Enquiry.js';

export async function createEnquiry(req, res, next) {
  try {
    const { name, phone, pickup, destination, travelDate, passengers, vehicle, tripType, message } = req.body;
    const doc = await Enquiry.create({ name, phone, pickup, destination, travelDate, passengers, vehicle, tripType, message });
    res.status(201).json({ success: true, message: 'Enquiry received.', id: doc._id });
  } catch (err) {
    next(err);
  }
}
