import mongoose from "mongoose";

const DeveloperWorkSchema = new mongoose.Schema(
  {
    employeeId: String,
    project: {
      type: String,
      required: true
    },
    technologies: {
      type: String,
      required: true
    },
    startAt: {
      type: Date,
      required: true
    },
    finishedAt: {
      type: Date
    },
    issues: {
      type: String
    },
    feedback: {
      type: String
    }
  },
  { timestamps: true }
);


const BDMWorkSchema = new mongoose.Schema(
  {
    employeeId: String,
    projectTitle: {
      type: String,
      required: true
    },
    clientName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
      type: String,
      min: 10,
      max: 15,
    }
  },
  { timestamps: true }
);
const LeavesSchema = new mongoose.Schema();
const PaymentsSchema = new mongoose.Schema();

const EmployeeSchema = new mongoose.Schema(
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
    developerWorks: [DeveloperWorkSchema],
    bdmWorks: [BDMWorkSchema]
  },
  { timestamps: true }
);


const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;