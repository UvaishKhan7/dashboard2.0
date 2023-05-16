import mongoose from 'mongoose';

const financeDetailsSchema = new mongoose.Schema(
    {
        userId: String,
        employeeName: {
            type: String,
            required: true
        },
        employeeId: {
            type: Number,
            required: true
        },
        aadhaar: {
            type: Number,
            required: true
        },
        pan: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        accountNumber: {
            type: Number,
            required: true
        },
        ifscCode: {
            type: String,
            required: true
        },
    },
);

const FinanceDetails = mongoose.model('FinanceDetails', financeDetailsSchema);

export default FinanceDetails;