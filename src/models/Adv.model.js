import mongoose from "mongoose";

const advSchema = new mongoose.Schema(
  {
    img: [
      {
        url: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Adv = mongoose.model("Adv", advSchema);
export default Adv;
