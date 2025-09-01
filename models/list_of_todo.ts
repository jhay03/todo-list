import mongoose, { Schema, models } from "mongoose";

function generateCustomId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

const TodoSchema = new Schema(
  {
    _id: {
      type: String,
      default: generateCustomId,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
      type: [String],
      enum: ["Frontend", "QA", "UI", "Devops"],
      required: true,
    },
    completed: { type: Boolean, required: true, default: false },
    priority: {
      type: String,
      enum: ["1", "2", "3"],
      required: true,
    },
  },
  { timestamps: true }
);

const TodoItem = models.Todo || mongoose.model("Todo", TodoSchema);
export default TodoItem;
