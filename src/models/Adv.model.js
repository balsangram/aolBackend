import mongoose from 'mongoose';

const advSchema = new mongoose.Schema(
  {
    img:[],
  },
  { timestamps: true }
);

const Adv = mongoose.model('Adv', advSchema);
export default Adv;
