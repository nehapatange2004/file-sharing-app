import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //unique one
  password: { type: String, required: true }, // not plain but hashed password
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
