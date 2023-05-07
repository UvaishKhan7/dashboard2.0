import mongoose from 'mongoose';

const bdmWorksSchema = new mongoose.Schema(
    {
        userId: String,
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
        },
    },
    { timestamps: true }
);

const BDMWorks = mongoose.model('BDMWorks', bdmWorksSchema);

export default BDMWorks;