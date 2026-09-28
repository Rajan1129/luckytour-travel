import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tripType: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true, default: 'Car' },
    text: { type: String, required: true, trim: true },
    to: { type: String, trim: true, default: '' },
    image: { type: String, required: true, trim: true },
    baseFare: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Service', serviceSchema);
