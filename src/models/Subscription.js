import mongoose  from "mongoose";

const sampleSubscription = new mongoose.Schema({
  planDuration: {
    type: String,
    enum: ["weekly", "monthly"],
    required: true,
    trim: true,
    lowercase: true,
  },
  numberOfDays: {
    type: Number,
    enum: [5, 7],
    required: true,
  },
  mealsPerDay: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  price: {
    type: Number,
    required: false,
    default: 2000,
  },
  mealTypes: {
    type: [String],
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
    lowercase: true,
    trim: true,
  },
  dietaryPreference: {
    type: [String],
    enum: ["veg", "non-veg", "vegan"],
    lowercase: true,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const sampleSub = mongoose.models.sampleSub || mongoose.model("sampleSub", sampleSubscription);

export default sampleSub;
