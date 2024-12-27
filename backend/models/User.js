const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["customer", "retailer", "staff", "delivery_man"], default: "customer" },
  profile: {
    location: {
      country: String,
      division: String,
      district: String,
      upazila: String,
      region: { type: String, required: false }, // Predefined regions
    },
  },
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Delivery man's staff
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

module.exports = mongoose.model("User", userSchema);
