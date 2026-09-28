import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    phone1: { type: String, default: '09817 980599' },
    phone1Tel: { type: String, default: '09817980599' },
    phone2: { type: String, default: '09816 980599' },
    phone2Tel: { type: String, default: '09816980599' },
    whatsapp: { type: String, default: '919817980599' },
    address: { type: String, default: 'M4C6+54R, Amb Andaura Railway Station Rd, Amb, Himachal Pradesh 177203' },
    announcement: { type: String, default: '24/7 Vande Bharat pickups & instant cab dispatch available at Amb Andaura Station' },
    showAnnouncement: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Setting', settingSchema);
