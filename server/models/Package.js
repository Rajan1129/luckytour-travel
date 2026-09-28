import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    highlights: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    price: { type: String, trim: true, default: '' },
    to: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Package', packageSchema);
