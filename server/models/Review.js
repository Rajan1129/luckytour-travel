import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true, trim: true },
    trip: { type: String, trim: true, default: '' },
    date: { type: String, trim: true, default: '' },
    isApproved: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Review', reviewSchema);
