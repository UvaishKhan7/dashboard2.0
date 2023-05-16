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
    },
    phone: {
      type: String,
      required: true,
      min: 10,
      max: 14
    },
    address: {
      type: String,
      required: true
    },
    photo: String,
    role: {
      type: String,
      enum: ["employee", "admin", "superadmin"],
      default: "employee",
    },
    doj: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    nomineeName: {
      type: String,
      required: true
    },
    nomineeContact: {
      type: String,
      required: true,
      min: 10,
      max: 14
    },
    financeDetails:[{type: Schema.Types.ObjectId, ref: 'FinanceDetails'}],
    bdmWorks: [{ type: Schema.Types.ObjectId, ref: 'BDMWork' }],
    developmentWorks: [{ type: Schema.Types.ObjectId, ref: 'DevelopmentWork' }],
    videoEditor: [{ type: Schema.Types.ObjectId, ref: 'VideoEditor' }],
    socialMediaManager: [{ type: Schema.Types.ObjectId, ref: 'SocialMediaManager' }],
    contentWriter: [{ type: Schema.Types.ObjectId, ref: 'ContentWriter' }],
    leaves: [{ type: Schema.Types.ObjectId, ref: 'Leaves' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;