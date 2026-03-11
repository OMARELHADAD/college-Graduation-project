import mongoose from "mongoose";
const { Schema } = mongoose;

const alertSchema = new Schema(
  {
    userId: {
      type: String, // Or ObjectId if linking directly
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Alert", alertSchema);
