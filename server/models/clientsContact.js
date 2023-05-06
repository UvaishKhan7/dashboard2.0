import mongoose from "mongoose";

const ClientsContactSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Mobile App Development",
        "Ads Management",
        "Content Writing",
        "Video Editing",
        "Graphics Design",
        "SEO",
        "Social media management",
      ],
    },
    requirement: {
      type: String,
      required: true,
      min: 10,
    },
    message: String,
  },
  { timestamps: true }
);

const ClientsContact = mongoose.model("ClientsContact", ClientsContactSchema);
export default ClientsContact;
