import mongoose from 'mongoose';

const fleetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    capacity: { type: String, required: true, trim: true },
    bags: { type: String, required: true, trim: true },
    ac: { type: Boolean, default: true },
    text: { type: String, required: true, trim: true },
    note: { type: String, trim: true, default: '' },
    image: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Fleet', fleetSchema);
