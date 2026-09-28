import mongoose from 'mongoose';

export const TRIP_TYPES = ['Local', 'Outstation', 'Tour Package', 'Airport/Railway Transfer', 'Other'];
export const ENQUIRY_STATUSES = ['New', 'Confirmed', 'Completed', 'Cancelled'];

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    pickup: { type: String, required: true, trim: true, maxlength: 300 },
    destination: { type: String, required: true, trim: true, maxlength: 300 },
    travelDate: { type: Date, required: true },
    passengers: { type: Number, required: true, min: 1, max: 60 },
    vehicle: { type: String, trim: true, maxlength: 120, default: 'No preference' },
    tripType: { type: String, enum: TRIP_TYPES, required: true },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'New' },
    adminNotes: { type: String, trim: true, default: '' }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Enquiry', enquirySchema);
