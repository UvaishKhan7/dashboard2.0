import mongoose from "mongoose";

const FooterContactSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        name: {
            type: String,
            required: true,
            min: 2,
            max: 30,
        },
        phone: {
            type: String,
            required: true,
            min: 10,
        },
    },
    { timestamps: true },
);

const FooterContact = mongoose.model("FooterContact", FooterContactSchema);
export default FooterContact;