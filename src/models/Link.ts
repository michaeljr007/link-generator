// models/Link.ts
import { Schema, model, models } from "mongoose";

const linkSchema = new Schema({
  slug: { type: String, unique: true, required: true },
  original: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default models.Link || model("Link", linkSchema);
