import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    employeeId: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    position: {
      type: String,
      required: true,
      min: 2,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
      max: 10
    },
    address: String,
    photo: String,
    role: {
      type: String,
      enum: ["employee", "admin", "superadmin"],
      default: "employee",
    },
    doj: {
      type: Date,
    },
    status: String,
    bdmWorks: [{ type: Schema.Types.ObjectId, ref: 'BDMWork' }],
    developmentWorks: [{ type: Schema.Types.ObjectId, ref: 'DevelopmentWork' }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;